import Logo from '@components/Logo'

interface Props {
  onClick?(e: React.MouseEvent<HTMLImageElement>): void
  size: 'large' | 'small'
}

export default {
  title: 'Components/Logo',
  component: Logo,
}

export const Default = (args: Props) => {
  return <Logo {...args}></Logo>
}
