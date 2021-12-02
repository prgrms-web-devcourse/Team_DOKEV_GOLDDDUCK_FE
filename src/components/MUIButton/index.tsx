import React from 'react'
import Button from '@mui/material/Button'

interface Props {
  onClick?(): void
  text?: string
  color?: string
  variant?: 'text' | 'contained' | 'outlined'
  href?: string
  height?: string
  width?: string
  backgroundColor?: string
  borderRadius?: string
  fontSize?: string
}

const MUIButton: React.FC<Props> = ({
  onClick,
  text,
  variant = 'contained',
  href,
  ...props
}) => {
  return (
    <>
      <Button
        variant={variant}
        href={href}
        onClick={onClick}
        style={{ ...props }}>
        {text}
      </Button>
    </>
  )
}

export default MUIButton
