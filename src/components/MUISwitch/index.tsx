import Switch from '@mui/material/Switch'
import { COLORS } from '@utils/constants/colors'
import styled from '@emotion/styled'

const MUISwitch = (props: {
  used: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}): JSX.Element => {
  return (
    <CustomSwitch
      checked={props.used}
      onChange={props.handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  )
}

const CustomSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase': {},
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'red',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: `${COLORS.RED}`,
  },
  '& .MuiSwitch-track': {
    backgroundColor: `${COLORS.TEXT_GRAY_DARK}`,
    padding: 0,
  },
}))

export default MUISwitch
