import styled from '@emotion/styled'
import { DEFAULT_MARGIN, FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>로고 컴포넌트</Logo>
      <Avatar>아바타 컴포넌트</Avatar>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  width: 100%;
  /* background-color: green; */
  display: flex;
  justify-content: space-between;
  align-self: center;
`

const Logo = styled.div`
  width: 144px;
  height: 72px;
  color: white;
  background-color: grey;
`

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: grey;
`

export default Header
