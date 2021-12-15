import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'
import Image from '@components/Image'
import Logo from '@components/Logo'
import Text from '@components/Text'
import { COLORS } from '@utils/constants/colors'

const INTRODUCE = '도깨비님 안녕하세요. \n 금뚝에 오신 것을 환영합니다!'

const KAKAO_URL =
  'http://ec2-3-36-59-242.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/redirect'

const login = (): JSX.Element => {
  return (
    <>
      <LoginContainer>
        <Logo
          size="large"
          style={{ position: 'absolute', zIndex: 99, top: '40px' }}
        />
        <Text size="LARGE" color="WHITE" style={{ ...textStyle }}>
          {INTRODUCE}
        </Text>
        <MUIButton href={KAKAO_URL} style={{ ...btnStyle }}>
          <BtnText>
            <Image
              src="/kakao.png"
              iscircle={true}
              width="30px"
              height="30px"
              style={{ backgroundColor: 'white' }}
            />
            <Text
              size="MEDIUM"
              color="WHITE"
              style={{
                width: '100%',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              카카오 계정으로 로그인하기
            </Text>
          </BtnText>
        </MUIButton>
        <VideoBox src={'/video/Snow.mp4'} autoPlay muted loop />
      </LoginContainer>
    </>
  )
}

const textStyle: React.CSSProperties = {
  position: 'absolute',
  zIndex: 99,
  top: '30%',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  lineHeight: 1.5,
}

const btnStyle: React.CSSProperties = {
  color: 'white',
  backgroundColor: COLORS.RED,
  width: '80%',
  height: '40px',
  borderRadius: '50px',
  position: 'absolute',
  bottom: '20%',
  zIndex: 99,
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
  height: 100%;
  position: absolute;
  bottom: 0;
  z-index: 9;
  object-fit: cover;
`

const BtnText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export default login
