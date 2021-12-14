import Logo from '@components/Logo'
import MUIAvatar from '@components/MUIAvatar'
import { useUserContext } from '@contexts/UserProvider'
import styled from '@emotion/styled'
import Link from 'next/link'

const Header = (): JSX.Element => {
  const { user } = useUserContext()

  return (
    <Wrapper>
      <Link href="/">
        <a>
          <Logo size={'small'} style={{ cursor: 'pointer' }} />
        </a>
      </Link>
      <Link href="/mypage">
        <a>
          <MUIAvatar
            src={user.profileImage}
            width={'60px'}
            height={'60px'}
            style={{ cursor: 'pointer' }}
          />
        </a>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  position: relative;
  z-index: 99;
`

export default Header
