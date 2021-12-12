import Header from '@domains/Header'
import styled from '@emotion/styled'
import TextHeader from '@domains/TimerHeader'
import { useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import Image from '@components/Image'
import MUIButton from '@components/MUIButton'
import { COLORS } from '@utils/constants/colors'

const startDate = new Date('12/13/2021')

const MOCK_DATA = {
  id: 12345,
  eventCode: 'vllvlvla',
  eventTitle: '이벤트 제목',
  eventStart: startDate,
  eventMaster: '도가가',
  eventProgressStatus: 'IsOver',
}

const random = (): JSX.Element => {
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const [isTimerOver, setIsTimerOver] = useState(false)
  let timer: NodeJS.Timer

  const handleStartVideo = () => {
    if (isTimerOver) {
      setIsVideoLoading(true)
    } else {
      alert('지금은 선물을 받을 수 없어요!')
    }
  }

  const checkRemaining = () => {
    const now = new Date()
    const distance = Number(MOCK_DATA.eventStart) - Number(now)
    if (distance < 0) {
      clearTimeout(timer)
      setIsTimerOver(true)
    }
  }

  useEffect(() => {
    timer = setInterval(checkRemaining, 1000)
  }, [])

  return (
    <>
      <Header />
      <TextHeader
        eventMaster={MOCK_DATA.eventMaster}
        eventStart={MOCK_DATA.eventStart}
      />
      {isVideoEnded && (
        <ZoomInDownWrapper>
          <Image
            src="/test.jpeg"
            width="80%"
            height="80%"
            mode="contain"
            style={{ margin: '0 auto' }}
          />
          <MUIButton style={{ ...BtnStyle }}>
            <a href="/test.jpeg" download>
              저장하기
            </a>
          </MUIButton>
        </ZoomInDownWrapper>
      )}
      {isVideoLoading ? (
        <FadeInWrapper>
          <VideoBox
            src="/video/Random.mp4"
            muted
            autoPlay
            onEnded={() => setIsVideoEnded(true)}
          />
        </FadeInWrapper>
      ) : (
        <FadeInScaleWrapper>
          <Image
            src="/GiftRudolf.png"
            width="240px"
            height="260px"
            onClick={handleStartVideo}
            style={{ margin: '0 auto' }}
          />
        </FadeInScaleWrapper>
      )}
    </>
  )
}

const BtnStyle: React.CSSProperties = {
  width: '30%',
  borderRadius: '50px',
  margin: '0 auto',
  marginTop: '16px',
  backgroundColor: COLORS.RED,
}

const fadeInScale = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }

  30%, 70% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(3);
    opacity: 0;
    }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const ZoomInDown = keyframes`
  0% {
    opacity: 0;
    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
    animation-timing-function: cubic-bezier(0.55, .055, .675, .19)
  }
  60% {
    opacity: 1;
    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    animation-timing-function: cubic-bezier(0.175, .885, .32, 1)
  }
`

const FadeInWrapper = styled.div`
  animation: ${fadeIn} 2s ease-out;
`

const FadeInScaleWrapper = styled.div`
  width: 100%;
  height: 45%;
  position: absolute;
  bottom: 0;
  animation: ${fadeInScale} 2s ease-out;
`

const ZoomInDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  animation: ${ZoomInDown} 2s ease-out;
`

const VideoBox = styled.video`
  width: 100%;
  height: 70%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default random
