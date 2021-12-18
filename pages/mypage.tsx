import styled from '@emotion/styled'
import Header from '@domains/Header'
import MUIAvatar from '@components/MUIAvatar'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { getFilteredGiftList } from './api/gift'
import { filteredGiftList } from './api/services/gift'
import { IFilteredGiftItem, IPagination } from 'types/gift'
import GiftList from '@domains/GiftList.tsx'
import { filteredEventList } from './api/services/event'
import EventList from '@domains/EventList'
import { getFilteredEventList } from './api/event'
import { IFilteredEventItem } from 'types/event'
import { useUserContext } from '@contexts/UserProvider'
import { getUesrInfo } from './api/user'
import Text from '@components/Text'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Icon from '@components/Icon'
import { LogOutAlert } from '@components/Swalert'

const MUITab = dynamic(() => import('@components/MUITab/MUITab'), {
  ssr: false,
})
const MUITabPanel = dynamic(() => import('@components/MUITab/MUITabPanel'), {
  ssr: false,
})

const MyPage = (): JSX.Element => {
  const router = useRouter()
  const { user, updateUser, clearToken } = useUserContext()
  const currentTab = router.query.tab === 'event' ? 'event' : 'gift'
  const [selectedTab, setSelectedTab] = useState(currentTab)
  const [isLoading, setIsLoading] = useState(false)
  const [giftRes, setGiftRes] = useState<[IPagination, IFilteredGiftItem[]]>()
  const [eventRes, setEventRes] =
    useState<[IPagination, IFilteredEventItem[]]>()

  // 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    const data = await getUesrInfo()
    if (data) {
      updateUser(data)
    } else {
      router.replace('/login')
    }
  }, [router])

  useEffect(() => {
    fetchUser()
  }, [])

  // 필터에 따른 받은 선물 목록 조회
  const fetchGiftList = useCallback(
    async (filter) => {
      if (user?.id) {
        setIsLoading(true)

        const isUsed =
          filter === 'used' ? true : filter === 'un_used' ? false : ''
        const data = await getFilteredGiftList(isUsed, user?.id)
        data && setGiftRes(filteredGiftList(data))

        setIsLoading(false)
      }
    },
    [user],
  )

  //필터에 따른 나의 이벤트 목록 조회
  const fetchEventList = useCallback(
    async (filter) => {
      if (user?.id) {
        setIsLoading(true)

        const status = filter === 'all' ? '' : filter.toUpperCase()
        const data = await getFilteredEventList(status, user?.id)
        data && setEventRes(filteredEventList(data))

        setIsLoading(false)
      }
    },
    [user],
  )

  useEffect(() => {
    if (user?.id) {
      fetchGiftList('all')
      fetchEventList('all')
    }
  }, [user])

  const handleTabChange = useCallback(
    (e: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(() => (newValue === 0 ? 'gift' : 'event'))
    },
    [user],
  )

  useEffect(() => {
    setSelectedTab(router.query.tab === 'event' ? 'event' : 'gift')
  }, [router.query.tab, user])

  const handleFilterClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      const element = e.target as HTMLElement
      selectedTab === 'event'
        ? fetchEventList(element?.id)
        : fetchGiftList(element?.id)
    },
    [selectedTab, user],
  )

  const logOut = () => {
    clearToken()
    router.push('/login')
  }

  return user?.id ? (
    <>
      <Header />
      <Profile>
        <MUIAvatar width={'120px'} height={'120px'} src={user?.profileImage} />
        <Text color="WHITE" size="LARGE">
          {user?.name}
          {user?.id}
        </Text>
        <Icon
          name="logout"
          color="TEXT_GRAY_DARK"
          size="MEDIUM"
          onIconClick={() => LogOutAlert(logOut)}
          style={{ marginLeft: 'auto', marginTop: 100 }}
        />
      </Profile>
      {router.isReady && currentTab === selectedTab && (
        <>
          <MUITab onChange={handleTabChange} />
          <MUITabPanel selectedTab={selectedTab} tab={'gift'} index={0}>
            <GiftList
              filteredGifts={giftRes?.[1] || []}
              onClick={handleFilterClick}
              isLoading={isLoading}
            />
          </MUITabPanel>
          <MUITabPanel selectedTab={selectedTab} tab={'event'} index={1}>
            <EventList
              filteredEvents={eventRes?.[1] || []}
              onClick={handleFilterClick}
              isLoading={isLoading}
            />
          </MUITabPanel>
        </>
      )}
    </>
  ) : (
    <></>
  )
}

const Profile = styled.div`
  width: 320px;
  margin: ${DEFAULT_MARGIN} auto;
  align-items: center;
  display: flex;
  gap: 40px;
`

export default MyPage
