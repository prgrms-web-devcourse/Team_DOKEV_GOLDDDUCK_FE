import { CSSProperties } from 'react'
import Button from '@components/MUIButton'

interface Props {
  onClick?(): void
  variant?: 'text' | 'contained' | 'outlined'
  href?: string
  style?: CSSProperties
}
export default {
  title: 'Components/Button',
  component: Button,
}

export const Default = (args: Props) => {
  return <Button {...args}>Button</Button>
}
