import styled from '@emotion/styled'
import Header from '@domains/Header'
import MUIAvatar from '@components/MUIAvatar'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { getFilteredGiftList } from './api/gift'
import { filteredGiftList } from './api/services/gift'
import { IFilteredGiftItem } from 'types/gift'
import GiftList from '@domains/GiftList'
import { filteredEventList } from './api/services/event'
import EventList from '@domains/EventList'
import { getFilteredEventList } from './api/event'
import { IFilteredEventItem } from 'types/event'
import { useUserContext } from '@contexts/UserProvider'
import { getUserInfo } from './api/user'
import Text from '@components/Text'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Icon from '@components/Icon'
import { LogOutAlert } from '@components/Swalert'
import useInfiniteScroll from '@hooks/useInfiniteScroll'

const MUITab = dynamic(() => import('@components/MUITab/MUITab'), {
  ssr: false,
})
const MUITabPanel = dynamic(() => import('@components/MUITab/MUITabPanel'), {
  ssr: false,
})

const MyPage = (): JSX.Element => {
  const router = useRouter()
  const { user, updateUser, clearToken } = useUserContext()
  const [target, setTarget] = useState<Element | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const currentTab = router.query.tab === 'event' ? 'event' : 'gift'
  const currentFilter = router.query.filter ? router.query.filter : 'all'
  const [selectedTab, setSelectedTab] = useState(currentTab)
  const [selectedFilter, setSelectedFilter] = useState(currentFilter)
  const [isLoading, setIsLoading] = useState(false)
  const [giftList, setGiftList] = useState([] as IFilteredGiftItem[])
  const [eventList, setEventList] = useState([] as IFilteredEventItem[])
  // 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    const data = await getUserInfo()
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
        const data = await getFilteredGiftList(
          isUsed,
          user?.id,
          currentPage,
          20,
        )

        if (data) {
          setGiftList(giftList.concat(filteredGiftList(data).giftList))
          setTotalPages(filteredEventList(data).totalPages)
        }

        setIsLoading(false)
      }
    },
    [user, currentPage],
  )

  //필터에 따른 나의 이벤트 목록 조회
  const fetchEventList = useCallback(
    async (filter) => {
      if (user?.id) {
        setIsLoading(true)
        const status = filter === 'all' ? '' : filter.toUpperCase()
        const data = await getFilteredEventList(
          status,
          user?.id,
          currentPage,
          20,
        )
        if (data) {
          setEventList(eventList.concat(filteredEventList(data).eventList))
          setTotalPages(filteredEventList(data).totalPages)
        }

        setIsLoading(false)
      }
    },
    [user, currentPage],
  )

  useEffect(() => {
    if (user?.id) {
      selectedTab === 'gift'
        ? fetchGiftList(selectedFilter)
        : fetchEventList(selectedFilter)
    }
  }, [user, currentPage, selectedFilter, selectedTab])

  const handleTabChange = useCallback(
    (e: React.SyntheticEvent, newValue: number) => {
      setCurrentPage(0)
      setTotalPages(0)
      setSelectedFilter('all')
      setSelectedTab(() => (newValue === 0 ? 'gift' : 'event'))
      newValue === 0 ? setEventList([]) : setGiftList([])
    },
    [],
  )

  useEffect(() => {
    setSelectedTab(router.query.tab === 'event' ? 'event' : 'gift')
  }, [router.query.tab])

  const handleFilterClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      const element = e.target as HTMLElement
      selectedTab === 'gift' ? setGiftList([]) : setEventList([])
      setTotalPages(0)
      setCurrentPage(0)
      setSelectedFilter(element?.id)
      router.push(`/mypage?tab=${selectedTab}&filter=${element.id}`)
    },
    [selectedTab],
  )

  useEffect(() => {
    setSelectedFilter(router.query.filter ? router.query.filter : 'all')
  }, [router.query.filter])

  const logOut = () => {
    clearToken()
    router.push('/login')
  }

  useInfiniteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (currentPage + 1 < totalPages && isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1)
      }
    },
    threshold: 1,
  })

  return user?.id ? (
    <>
      <Header />
      <Profile>
        <MUIAvatar width={'120px'} height={'120px'} src={user?.profileImage} />
        <Text color="WHITE" size="LARGE">
          {user?.name}
        </Text>
        <Icon
          name="logout"
          color="TEXT_GRAY_DARK"
          size="MEDIUM"
          onIconClick={() => LogOutAlert(logOut)}
          style={{ marginLeft: 'auto', marginTop: 100 }}
        />
      </Profile>
      {currentTab === selectedTab && (
        <>
          <MUITab onChange={handleTabChange} />
          <MUITabPanel selectedTab={selectedTab} tab={'gift'} index={0}>
            <GiftList
              filteredGifts={giftList}
              onClick={handleFilterClick}
              isLoading={isLoading}
            />
          </MUITabPanel>
          <MUITabPanel selectedTab={selectedTab} tab={'event'} index={1}>
            <EventList
              filteredEvents={eventList}
              onClick={handleFilterClick}
              isLoading={isLoading}
            />
          </MUITabPanel>
          <div ref={setTarget} />
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
  user-select: none;
`

export default MyPage
