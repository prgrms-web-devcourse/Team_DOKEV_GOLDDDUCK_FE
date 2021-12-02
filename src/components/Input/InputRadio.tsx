import React from 'react'
import { Radio } from '@mui/material'
import { red } from '@mui/material/colors'

interface IInputRadio {
  value: string
  id: string
  name: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  style?: React.CSSProperties
}

const InputRadio = ({
  value,
  id,
  name,
  checked,
  onChange,
  style,
}: IInputRadio): React.ReactElement => {
  const controlProps = {
    id,
    value,
    name,
    checked,
    onChange,
  }

  return (
    <Radio
      {...controlProps}
      sx={{
        color: red[800],
        '&.Mui-checked': {
          color: red[600],
        },
      }}
      style={{ ...style }}
    />
  )
}

export default InputRadio
