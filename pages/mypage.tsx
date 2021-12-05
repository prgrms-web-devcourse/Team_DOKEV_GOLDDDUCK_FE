import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { COLORS } from '@utils/constants/colors'
import styled from '@emotion/styled'
import Header from '@domains/Header'
import MUIAvatar from '@components/MUIAvatar'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <StyledPanel
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
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
  const [value, setValue] = React.useState(0)

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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
      <Tabs
        variant="fullWidth"
        value={value}
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
        />
        <Tab
          label="나의 이벤트"
          {...a11yProps(1)}
          sx={{ width: '50%', color: COLORS.WHITE }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>gift list</div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>event list</div>
      </TabPanel>
    </>
  )
}

const Profile = styled.div`
  display: flex;
`

export default MUITab
