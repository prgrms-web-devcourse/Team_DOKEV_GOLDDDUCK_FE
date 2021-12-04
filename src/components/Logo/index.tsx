import Image from 'next/image'
import logo from '/public/logo.png'

interface Props {
  onClick?(e: React.MouseEvent<HTMLImageElement>): void
  size: 'large' | 'small'
}

const Logo = ({ size, onClick }: Props): JSX.Element => {
  return (
    <>
      {size === 'large' ? (
        <Image onClick={onClick} src={logo} width={240} height={120}></Image>
      ) : (
        <Image onClick={onClick} src={logo} width={144} height={72}></Image>
      )}
    </>
  )
}

export default Logo
