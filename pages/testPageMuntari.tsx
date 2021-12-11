import styled from '@emotion/styled'
import Image from '@components/Image'
import Text from '@components/Text'
import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Header from '@domains/Header'
import { useState } from 'react'
import { COLORS } from '@utils/constants/colors'
import { keyframes } from '@emotion/react'
const TestGaga = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (newValue === 100) {
      setOpen(true)
    }
  }

  return (
    <Container style={{}}>
      <Header />
      {open ? (
        <>
          <FadeInWrapper>
            <img
              src="testgif.gif"
              style={{
                width: '100%',
                height: '80vh',
                objectFit: 'cover',
                position: 'absolute',
                top: 92,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
              }}
            />
          </FadeInWrapper>
          <ZoomInDownWrapper>
            <img
              src="gift_test.png"
              style={{
                width: '60%',
                left: '20%',
                top: '10%',
                zIndex: 100,
                position: 'relative',
                transform: 'rotate(720deg)',
              }}
            />
          </ZoomInDownWrapper>
        </>
      ) : (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: '30%',
            left: '16px',
          }}>
          <CustomSlider
            aria-label="Temperature"
            defaultValue={10}
            onChange={handleSliderChange}
            // getAriaValueText={valuetext}
            color="secondary"
            sx={{
              backgroundColor: 'transparent',
              border: `3px solid ${COLORS.TEXT_GRAY_LIGHT}`,
              height: '22px',
              width: '80%',
            }}
          />
          <StyledText>밀어서 랜덤 선물받기</StyledText>
        </div>
      )}
    </Container>
  )
}
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
const ZoomInDownWrapper = styled.div`
  animation: ${ZoomInDown} 2s ease-out;
`
const FadeInWrapper = styled.div`
  animation: ${fadeIn} 2s ease-out;
`
const CustomSlider = styled(Slider)(() => ({
  '& .MuiSlider-rail, & .MuiSlider-track': {
    backgroundColor: 'transparent',
    border: 'none',
  },
  '& .MuiSlider-thumbColorSecondary.MuiSlider-thumbSizeMedium.MuiSlider-thumb':
    {
      backgroundColor: 'transparent',
      backgroundImage: 'url(giftrudolf.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '120px',
      height: '120px',
      border: 'none',
      boxShadow: 'none',
      zIndex: 100,
    },
  // '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
  //   backgroundColor: `${COLORS.RED}`,
  // },
  // '& .MuiSwitch-track': {
  //   backgroundColor: `${COLORS.TEXT_GRAY_DARK}`,
  //   padding: 0,
  // },
}))
const Container = styled.div`
  width: 100%;
  height: 100vh;
`
const StyledText = styled.div`
  position: absolute;
  font-size: 25px;
  z-index: 10;
  top: 2px;
  left: 50%;
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
export default TestGaga
