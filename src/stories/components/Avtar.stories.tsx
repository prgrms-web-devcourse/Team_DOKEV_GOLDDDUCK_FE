import Avatar from '@components/MUIAvatar'
import { CSSProperties } from 'react'

interface Props {
  onClick?(): void
  width?: string
  height?: string
  src?: string
  style?: CSSProperties
}

export default {
  title: 'Components/Avatar',
  component: Avatar,
}

export const Default = (args: Props) => {
  return <Avatar {...args}></Avatar>
}
