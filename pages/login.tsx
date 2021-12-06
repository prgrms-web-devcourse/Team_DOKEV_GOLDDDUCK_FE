import { FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'
import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'

const login = () => {
  const onButtonClick = () => {
    alert('안녕')
  }

  return (
    <>
      <LoginContainer>
        <Logo>로고 컴포넌트</Logo>
        <Text>텍스트 컴포넌트</Text>
        <MUIButton
          onClick={onButtonClick}
          style={{
            color: 'white',
            height: '40px',
            width: '80%',
            borderRadius: '50px',
            backgroundColor: 'red',
            position: 'absolute',
            bottom: '80px',
          }}>
          테스트버튼
        </MUIButton>
      </LoginContainer>
    </>
  )
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
`

const Logo = styled.div`
  width: 240px;
  height: 120px;
  background-color: grey;
  position: absolute;
  top: 40px;
`

const Text = styled.text`
  width: 240px;
  height: 120px;
  background-color: gray;
  position: absolute;
  color: ${COLORS.WHITE};
  font-size: ${FONT_SIZES.LARGE};
  top: 240px;
`

export default login