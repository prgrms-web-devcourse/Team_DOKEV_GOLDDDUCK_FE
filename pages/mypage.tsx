import styled from '@emotion/styled'
import Header from '@domains/Header'
import MUIAvatar from '@components/MUIAvatar'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { COLORS } from '@utils/constants/colors'
import { getFilteredGiftList } from './api/gift'
import { filteredGiftList } from './api/services/gift'
import { IFilteredGiftItem, IPagination } from 'types/gift'
import GiftList from '@domains/GiftList.tsx'
import { IFilteredEventItem } from 'types/event'
import { filteredEventList } from './api/services/event'
import EventList from '@domains/EventList'
import { getFilteredEventList } from './api/event'

const MUITab = dynamic(() => import('@components/MUITab/MUITab'), {
  ssr: false,
})
const MUITabPanel = dynamic(() => import('@components/MUITab/MUITabPanel'), {
  ssr: false,
})

const MyPage = (): JSX.Element => {
  const router = useRouter()
  const currentTab = router.query.tab === 'event' ? 'event' : 'gift'
  const [selectedTab, setSelectedTab] = useState(currentTab)
  const [isLoading, setIsLoading] = useState(false)
  const [giftRes, setGiftRes] = useState<[IPagination, IFilteredGiftItem[]]>()
  const [eventRes, setEventRes] =
    useState<[IPagination, IFilteredEventItem[]]>()

  const fetchGiftList = useCallback(async (filter) => {
    setIsLoading(true)
    const isUsed = filter === 'used' ? true : filter === 'un_used' ? false : ''
    const data = await getFilteredGiftList(isUsed)
    data && setGiftRes(filteredGiftList(data))
    setIsLoading(false)
  }, [])

  const fetchEventList = useCallback(async (filter) => {
    setIsLoading(true)
    const status = filter === 'all' ? '' : filter.toUpperCase()
    const data = await getFilteredEventList(status)
    data && setEventRes(filteredEventList(data))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchGiftList('all')
    fetchEventList('all')
  }, [])

  const handleTabChange = useCallback(
    (e: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue === 0 ? 'gift' : 'event')
    },
    [],
  )

  useEffect(() => {
    setSelectedTab(router.query.tab === 'event' ? 'event' : 'gift')
  }, [router.query.tab])

  const handleFilterClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      const element = e.target as HTMLElement
      selectedTab === 'gift'
        ? fetchGiftList(element.id)
        : fetchEventList(element.id)
    },
    [],
  )

  return (
    <>
      <Header />
      <Profile>
        <MUIAvatar width={'120px'} height={'120px'} />
        <div style={{ color: COLORS.WHITE }}>
          <div>산타클로스</div>
          <div>santa@email.com</div>
        </div>
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
  )
}

const Profile = styled.div`
  display: flex;
`

export default MyPage
