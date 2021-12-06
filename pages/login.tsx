import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'
import Image from '@components/Image'
import Logo from '@components/Logo'
import Text from '@components/Text'

const INTRODUCE = '도깨비님 안녕하세요. \n 금뚝에 오신 것을 환영합니다!'

const login = (): JSX.Element => {
  const googleLogin = () => {
    alert('구글 로그인 GET 요청')
  }

  return (
    <>
      <LoginContainer>
        <Logo
          size="large"
          style={{ position: 'absolute', zIndex: 99, top: '40px' }}
        />
        <Text
          size="LARGE"
          color="WHITE"
          style={{
            position: 'absolute',
            zIndex: 99,
            top: '240px',
            width: '220px',
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.5,
          }}>
          {INTRODUCE}
        </Text>
        <MUIButton
          onClick={googleLogin}
          style={{
            color: 'white',
            height: '40px',
            width: '80%',
            borderRadius: '50px',
            backgroundColor: 'red',
            position: 'absolute',
            bottom: '80px',
            zIndex: 99,
          }}>
          <BtnText>
            <Image
              src="/google.png"
              iscircle={true}
              width="30px"
              height="30px"
              style={{ backgroundColor: 'white' }}
            />
            <Text
              size="BASE"
              color="WHITE"
              style={{ width: '100%', fontWeight: 'bold' }}>
              구글 계정으로 로그인하기
            </Text>
          </BtnText>
        </MUIButton>
        <VideoBox src={'/video/Snow.mp4'} autoPlay muted loop />
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

const VideoBox = styled.video`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 9;
`
const BtnText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export default login
