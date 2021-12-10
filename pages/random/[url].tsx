import Header from '@domains/Header'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN, FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'
import TextHeader from '@domains/TimerHeader'
import { useState } from 'react'
import { keyframes } from '@emotion/react'
import Image from '@components/Image'

const random = () => {
  const [isAnimate, setIsAnimate] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const handleStartVideo = () => {
    setIsAnimate(true)
  }

  return (
    <>
      <Header />
      <TextHeader />
      {isEnded && (
        <Image
          src="/test.jpeg"
          width="80%"
          height="80%"
          style={{ ...LastImgStyle }}
        />
      )}
      {isAnimate ? (
        <VideoBox
          src="/video/Random.mp4"
          muted
          autoPlay
          onEnded={() => setIsEnded(true)}
        />
      ) : (
        <GiftWrapper>
          <Image
            src="/GiftRudolf.png"
            width="240px"
            height="260px"
            onClick={handleStartVideo}
          />
        </GiftWrapper>
      )}
    </>
  )
}

const FirstfadeIn = keyframes`
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

const LastfadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    }
`
const FirstDiv = styled.div`
  width: 240px;
  height: 240px;
  background-color: orange;
  margin: 0 auto;
  animation: ${FirstfadeIn} 2s linear;
`

const FirstImgStyle: React.CSSProperties = {
  margin: '0 auto',
  animation: `${LastfadeIn} 2s linear`,
  padding: '8px',
}

const LastImgStyle: React.CSSProperties = {
  margin: '0 auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: ' translate(-50%, -50%)',
  zIndex: 99,
  animation: `${LastfadeIn} 2s linear`,
}

const GiftWrapper = styled.div`
  width: 100%;
  height: 60%;
  position: absolute;
  bottom: 0;
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
