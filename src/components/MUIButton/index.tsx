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
}

const MUIButton: React.FC<Props> = ({
  onClick,
  children,
  variant = 'contained',
  disabled = false,
  sx,
  href,
  style,
}) => {
  return (
    <>
      <Button
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
