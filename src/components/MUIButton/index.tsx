import React, { CSSProperties } from 'react'
import Button from '@mui/material/Button'
import { SxProps } from '@mui/system'

interface Props {
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
  variant?: 'text' | 'contained' | 'outlined'
  href?: string
  sx?: SxProps
  disabled?: boolean
  style?: CSSProperties
  id?: string
}

const MUIButton: React.FC<Props> = ({
  onClick,
  children,
  variant = 'contained',
  disabled = false,
  sx,
  href,
  id,
  style,
}) => {
  return (
    <>
      <Button
        id={id}
        variant={variant}
        sx={sx}
        disabled={disabled}
        href={href}
        onClick={onClick}
        style={{ ...style }}>
        {children}
      </Button>
    </>
  )
}

export default MUIButton
