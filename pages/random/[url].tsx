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
import CardFlip from '@components/CardFlip'

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

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (newValue === 100) {
      if (isTimerOver) {
        setIsVideoLoading(true)
      } else {
        alert('djskdjskd')
      }
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
        <FadeInDownWrapper>
          <CardFlip
            front={
              <Image
                src="/test.jpeg"
                width="80%"
                height="80%"
                mode="contain"
                style={{ margin: '0 auto', borderRadius: '8px' }}
              />
            }
          />
          <MUIButton style={{ ...BtnStyle }}>
            <a href="/test.jpeg" download>
              저장하기
            </a>
          </MUIButton>
        </FadeInDownWrapper>
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
            disabled={isTimerOver ? false : true}
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    }
`

const FadeInWrapper = styled.div`
  animation: ${fadeIn} 2s ease-out;
`

const FadeInDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  animation: ${fadeInDown} 2s ease-out;
`

const VideoBox = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  bottom: 0;
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
