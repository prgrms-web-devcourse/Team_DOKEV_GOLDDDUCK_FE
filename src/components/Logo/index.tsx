import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'
import logo from '/public/logo.png'

interface Props {
  onClick?(e: React.MouseEvent<HTMLImageElement>): void
  size: 'large' | 'small'
}

const Logo = ({ size }: Props): JSX.Element => {
  const router = useRouter()

  return (
    <>
      {size === 'large' ? (
        <Image src={logo} width={240} height={120}></Image>
      ) : (
        <Image
          onClick={() => router.push('/main')}
          src={logo}
          width={144}
          height={72}></Image>
      )}
    </>
  )
}

export default Logo
