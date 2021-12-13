import React, { CSSProperties } from 'react'
import Avatar from '@mui/material/Avatar'

interface Props {
  onClick?(): void
  width?: string
  height?: string
  src?: string | null
  style?: CSSProperties
}

const MUIAvatar = ({
  onClick,
  width,
  height,
  src = '',
  style,
}: Props): JSX.Element => {
  return (
    <>
      <Avatar
        onClick={onClick}
        src={src ? src : ''}
        sx={{ width, height }}
        style={{ ...style }}
      />
    </>
  )
}

export default MUIAvatar
