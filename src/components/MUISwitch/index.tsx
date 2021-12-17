import { useCallback, useState } from 'react'
import Switch from '@mui/material/Switch'
import { COLORS } from '@utils/constants/colors'
import styled from '@emotion/styled'

const MUISwitch = (props: {
  used: boolean
  onChange: () => void
}): JSX.Element => {
  const [checked, setChecked] = useState(props.used)

  const handleChange = useCallback(() => {
    setChecked(() => !checked)
    props.onChange?.()
  }, [props.onChange])

  return (
    <CustomSwitch
      checked={checked}
      onChange={handleChange}
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
