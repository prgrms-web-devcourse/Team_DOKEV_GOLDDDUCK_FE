import logo from '/public/logo.png'
import Image from '@components/Image'

interface Props {
  size: 'large' | 'small'
  onClick?(e: React.MouseEvent<HTMLImageElement>): void
  style?: React.CSSProperties
}

const Logo = ({ size, onClick, ...style }: Props): JSX.Element => {
  return (
    <Image
      src={logo.src}
      width={size === 'large' ? 240 : 120}
      height={size === 'large' ? 120 : 60}
      onClick={onClick}
      {...style}
    />
  )
}

export default Logo
