import Header from '@domains/Header'
import styled from '@emotion/styled'
import TextHeader from '@domains/TimerHeader'
import { useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import Image from '@components/Image'
import MUIButton from '@components/MUIButton'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'
import Slider from '@mui/material/Slider'

const startDate = new Date('12/9/2021')

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

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (newValue === 100) {
      if (isTimerOver) {
        setIsVideoLoading(true)
      } else {
        alert('djskdjskd')
      }
    }
    // else {
    //   alert('지금은 선물을 받을 수 없어요!')
    // }
    // if (newValue === 100) {
    //   console.log('1232')
    // }
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
            src="/video/Stars.mp4"
            muted
            autoPlay
            onEnded={() => setIsVideoEnded(true)}
          />
        </FadeInWrapper>
      ) : (
        <SliderWrapper>
          <CustomSlider
            // disabled={isTimerOver ? false : true}
            aria-label="Temperature"
            onChange={handleSliderChange}
            color="secondary"
            sx={{
              backgroundColor: 'transparent',
              border: `3px solid ${COLORS.TEXT_GRAY_LIGHT}`,
              height: '22px',
              width: '100%',
            }}
          />
          <StyledText>밀어서 랜덤 선물받기</StyledText>
        </SliderWrapper>
      )}
      {/* <FadeInScaleWrapper>
          <Image
            src="/GiftRudolf.png"
            width="240px"
            height="260px"
            onClick={handleStartVideo}
            style={{ margin: '0 auto' }}
          />
        </FadeInScaleWrapper> */}
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

const SliderWrapper = styled.div`
  right: 0;
  width: 60%;
  margin: 0 auto;
  position: absolute;
  top: 70%;
  left: 0;
  @media all and (max-width: 425px) {
    top: 55%;
  }
  @media all and (max-width: 320px) {
    top: 60%;
  }
`

const CustomSlider = styled(Slider)(() => ({
  '& .MuiSlider-rail, & .MuiSlider-track': {
    backgroundColor: 'transparent',
    border: 'none',
  },
  '& .MuiSlider-thumbColorSecondary.MuiSlider-thumbSizeMedium.MuiSlider-thumb':
    {
      backgroundColor: 'transparent',
      backgroundImage: 'url(/giftrudolf.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '120px',
      height: '120px',
      border: 'none',
      boxShadow: 'none',
      zIndex: 99,
    },
}))

const StyledText = styled.div`
  position: absolute;
  font-size: ${FONT_SIZES.LARGE};
  top: 10%;
  right: -50px;
  transform: translate(-50%, 50%);
  background-image: linear-gradient(90deg, #111, #fff, #111);
  background-repeat: no-repeat;
  background-clip: text;
  background-size: 80% 100%;
  --webkit-backdrop-clip: text;
  color: transparent;
  animation: shine 2s linear infinite;
  @keyframes shine {
    0% {
      background-position: -500% 0;
    }
    100% {
      background-position: 500% 0;
    }
  }
`

export default random
