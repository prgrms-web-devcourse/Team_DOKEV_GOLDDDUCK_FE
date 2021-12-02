import Button from '@components/MUIButton'

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

export default {
  title: 'Components/Button',
  component: Button,
}

export const Default = (args: Props) => {
  return <Button {...args}></Button>
}
