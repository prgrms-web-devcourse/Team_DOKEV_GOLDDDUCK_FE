import React, { CSSProperties } from 'react'
import Button from '@mui/material/Button'

interface Props {
  onClick?(): void
  variant?: 'text' | 'contained' | 'outlined'
  href?: string
  style?: CSSProperties
}

const MUIButton: React.FC<Props> = ({
  onClick,
  children,
  variant = 'contained',
  href,
  style,
}) => {
  return (
    <>
      <Button
        variant={variant}
        href={href}
        onClick={onClick}
        style={{ ...style }}>
        {children}
      </Button>
    </>
  )
}

export default MUIButton
