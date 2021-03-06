import Header from '@domains/Header'
import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import Text from '@components/Text'
import { FONT_SIZES } from '@utils/constants/sizes'
import { useRouter } from 'next/router'
import { useUserContext } from '@contexts/UserProvider'
import { useCallback, useEffect } from 'react'
import { getUserInfo } from '../pages/api/user'

const INTRODUCE =
  '소중한 사람들에게 \n 색다르게 선물을 전달해보세요. \n\n 금뚝이가 도와드릴게요!'

export const main = () => {
  const { updateUser } = useUserContext()
  const router = useRouter()
  const { id } = useUserContext().user

  // 사용자 정보 API
  const getUserData = useCallback(async () => {
    const res = await getUserInfo()
    if (res) {
      updateUser(res)
    } else {
      sessionStorage.setItem('next_url', router.asPath)
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    getUserData()
  }, [])

  return id ? (
    <>
      <Header />
      <MainContainer>
        <Fade style={{ position: 'absolute', bottom: '65%', zIndex: 99 }}>
          <Text
            size="LARGE"
            color="WHITE"
            style={{
              textAlign: 'center',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}>
            {INTRODUCE}
          </Text>
        </Fade>
        <Fade style={{ position: 'absolute', bottom: '55%', zIndex: 99 }}>
          <MUIButton
            onClick={() => router.push('/post')}
            style={{
              color: 'white',
              height: '40px',
              width: '272px',
              borderRadius: '50px',
              backgroundColor: 'red',
              fontSize: FONT_SIZES.BASE,
            }}>
            이벤트 등록하기
          </MUIButton>
        </Fade>
        <VideoBox src={'/video/main.mp4'} autoPlay muted />
      </MainContainer>
    </>
  ) : (
    <></>
  )
}

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`

const VideoBox = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  z-index: 9;
`

const fadeIn = keyframes`
  0% {
    letter-spacing: -0.5em;
    transform: translateZ(-700px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
`

const Fade = styled.div`
  animation: ${fadeIn} 3s 5s cubic-bezier(0.215, 0.61, 0.355, 1) both;
`

export default main
