import * as React from 'react'
import styled from '@emotion/styled'
import Header from '@domains/Header'
import MUIAvatar from '@components/MUIAvatar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MUITabPanel from '@components/MUITabPanel'
import MUITab from './MUITab'
import { COLORS } from '@utils/constants/colors'

const MyPage = (): JSX.Element => {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(
    router.query.tab === 'event' ? 'event' : 'gift',
  )

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
      <MUITab selectedTab={selectedTab} onChange={handleChange} />
      <MUITabPanel selectedTab={selectedTab} tab={'gift'} index={0}>
        <div>gift list</div>
      </MUITabPanel>
      <MUITabPanel selectedTab={selectedTab} tab={'event'} index={1}>
        <div>event list</div>
      </MUITabPanel>
    </>
  )
}

const Profile = styled.div`
  display: flex;
`

export default MyPage
