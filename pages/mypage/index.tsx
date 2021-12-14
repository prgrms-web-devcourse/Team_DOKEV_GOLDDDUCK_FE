import styled from '@emotion/styled'
import Header from '@domains/Header'
import MUIAvatar from '@components/MUIAvatar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { COLORS } from '@utils/constants/colors'
import GiftList from '@domains/GiftList.tsx'

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

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue === 0 ? 'gift' : 'event')
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
          <MUITab onChange={handleChange} />
          <MUITabPanel selectedTab={selectedTab} tab={'gift'} index={0}>
            <div>gift list</div>
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
