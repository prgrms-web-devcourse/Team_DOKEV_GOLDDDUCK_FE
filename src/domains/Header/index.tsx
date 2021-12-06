import Logo from '@components/Logo'
import MUIAvatar from '@components/MUIAvatar'
import styled from '@emotion/styled'
import { useRouter } from 'next/dist/client/router'

const Header = (): JSX.Element => {
  const router = useRouter()

  return (
    <Wrapper>
      <Logo
        size={'small'}
        onClick={() => router.push('/')}
        style={{ cursor: 'pointer' }}
      />
      <MUIAvatar
        width={'60px'}
        height={'60px'}
        onClick={() => router.push('/mypage')}
        style={{ cursor: 'pointer' }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
`

export default Header
