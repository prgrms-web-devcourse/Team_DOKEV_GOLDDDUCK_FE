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
// import Spinner from '@components/Spinner'

const MUITab = dynamic(() => import('@components/MUITab/MUITab'), {
  ssr: false,
})
const MUITabPanel = dynamic(() => import('@components/MUITab/MUITabPanel'), {
  ssr: false,
})

/* TEST_DATA */
const MyPage = (): JSX.Element => {
  const router = useRouter()
  const currentTab = router.query.tab === 'event' ? 'event' : 'gift'
  const [selectedTab, setSelectedTab] = useState(currentTab)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<[IPagination, IFilteredGiftItem[]]>()
  const giftList = response?.[1]

  const fetchList = useCallback(async (filter) => {
    setIsLoading(true)
    const data = await getFilteredGiftList(filter)
    data && setResponse(filteredGiftList(data))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchList('all')
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
      fetchList(element.id)
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
              filteredGifts={giftList || []}
              onClick={handleFilterClick}
            />
          </MUITabPanel>
          <MUITabPanel selectedTab={selectedTab} tab={'event'} index={1}>
            <div>event list</div>
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
