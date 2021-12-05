import MUIAvatar from '@components/MUIAvatar'
import styled from '@emotion/styled'

const Header = (): JSX.Element => {
  return (
    <Wrapper>
      <div>Logo</div>
      <MUIAvatar width={'60px'} height={'60px'} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
`

export default Header
