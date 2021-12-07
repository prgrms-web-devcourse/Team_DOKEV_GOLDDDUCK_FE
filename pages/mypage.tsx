import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { COLORS } from '@utils/constants/colors'
import styled from '@emotion/styled'
import Header from '@domains/Header'
import MUIAvatar from '@components/MUIAvatar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  tab: string
  selectedTab: string | string[]
}

const TabPanel = (props: TabPanelProps) => {
  const { children, tab, selectedTab, ...other } = props

  return (
    <StyledPanel
      role="tabpanel"
      hidden={tab !== selectedTab}
      id={`simple-tabpanel-${tab}`}
      aria-labelledby={`simple-tab-${tab}`}
      {...other}>
      {selectedTab === tab && <Box sx={{ p: 2 }}>{children}</Box>}
    </StyledPanel>
  )
}

const StyledPanel = styled.div`
  color: ${COLORS.WHITE};
`

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const MUITab = (): JSX.Element => {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(
    router.query.tab === 'event' ? 'event' : 'gift',
  )

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue === 0 ? 'gift' : 'event')
  }

  useEffect(() => {
    console.log(selectedTab)
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
      <>
        <Tabs
          variant="fullWidth"
          value={selectedTab === 'gift' ? 0 : 1}
          onChange={handleChange}
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              background: COLORS.RED,
              width: '18%',
              marginLeft: '16%',
            },
          }}>
          <Tab
            label="받은 선물함"
            {...a11yProps(0)}
            sx={{
              width: '50%',
              color: COLORS.WHITE,
            }}
            onClick={() => router.push('/mypage?tab=gift')}
          />
          <Tab
            label="나의 이벤트"
            {...a11yProps(1)}
            sx={{ width: '50%', color: COLORS.WHITE }}
            onClick={() => router.push('/mypage?tab=event')}
          />
        </Tabs>
        <TabPanel selectedTab={selectedTab} tab={'gift'} index={0}>
          <div>gift list</div>
        </TabPanel>
        <TabPanel selectedTab={selectedTab} tab={'event'} index={1}>
          <div>event list</div>
        </TabPanel>
      </>
    </>
  )
}

const Profile = styled.div`
  display: flex;
`

export default MUITab
