import Avtar from '@components/MUIAvatar'
import { CSSProperties } from 'react'

interface Props {
  onClick?(): void
  width?: string
  height?: string
  src?: string
  style?: CSSProperties
}

export default {
  title: 'Components/Avtar',
  component: Avtar,
}

export const Default = (args: Props) => {
  return <Avtar {...args}></Avtar>
}
