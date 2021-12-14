import styled from '@emotion/styled'
import Header from '@domains/Header'
import MUIAvatar from '@components/MUIAvatar'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { COLORS } from '@utils/constants/colors'
import GiftList from '@domains/GiftList.tsx'
import axios from 'axios'
import { IGiftList } from 'types/gift'

const MUITab = dynamic(() => import('@components/MUITab/MUITab'), {
  ssr: false,
})
const MUITabPanel = dynamic(() => import('@components/MUITab/MUITabPanel'), {
  ssr: false,
})

/* TEST_DATA */
const END_POINT = 'http://maenguin.iptime.org:8080'

const MyPage = (): JSX.Element => {
  const router = useRouter()
  const currentTab = router.query.tab === 'event' ? 'event' : 'gift'
  const [selectedTab, setSelectedTab] = useState(currentTab)

  const handleTabChange = useCallback(
    (e: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue === 0 ? 'gift' : 'event')
    },
    [],
  )

  try {
    axios
      .get(`${END_POINT}${`/api/v1/members/1/gifts?used=&page=0&size=4`}`, {
        headers: {
          'X-GOLDDDUCK-AUTH':
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiZG9rZXYiLCJleHAiOjE2Mzk1ODkxNDgsImlhdCI6MTYzOTQxNjM0OCwidXNlcklkIjo2LCJ1c2VybmFtZSI6IuuPhOqwgOyYgSJ9.zTnvofVUculDdRdOH5jQ6iPfUWUIxq9XmdpSgHP5w44Amp4tbIuGoqsjsi9u7OPFrN6vBUh_1QIvnDpCpc83mw',
        },
      })
      .then((res) => res.data.data)
      .then(({ pagination, giftItemList }: IGiftList) => {
        console.log('gift', pagination, giftItemList)
      })
  } catch (e) {
    console.error(e)
  }

  useEffect(() => {
    setSelectedTab(router.query.tab === 'event' ? 'event' : 'gift')
  }, [router.query.tab])

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
            <div>
              <GiftList />
            </div>
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
