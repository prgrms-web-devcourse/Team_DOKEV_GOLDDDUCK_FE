import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { COLORS } from '@utils/constants/colors'
import { useRouter } from 'next/router'

interface ITab {
  selectedTab: string
  onChange: (e: React.SyntheticEvent, newValue: number) => void
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const MUITab = ({ selectedTab, onChange }: ITab) => {
  const router = useRouter()

  return (
    <Tabs
      variant="fullWidth"
      value={selectedTab === 'gift' ? 0 : 1}
      onChange={onChange}
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
        onClick={() => router.push(`/mypage?tab=gift`)}
      />
      <Tab
        label="나의 이벤트"
        {...a11yProps(1)}
        sx={{ width: '50%', color: COLORS.WHITE }}
        onClick={() => router.push(`/mypage?tab=event`)}
      />
    </Tabs>
  )
}

export default MUITab
