import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import Box from '@mui/material/Box'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  tab: string
  selectedTab: string
}

const TabPanel = ({ children, tab, selectedTab, ...other }: TabPanelProps) => {
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
  background-color: inherit;
`
export default TabPanel
