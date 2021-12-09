import Header from '@domains/Header'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN, FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'
import TextHeader from '@domains/TimerHeader'
import { useState } from 'react'

const random = () => {
  const [isStartVideo, setIsStartVideo] = useState(false)

  const handleStartVideo = () => {
    setIsStartVideo(true)
  }

  return (
    <>
      <Header />
      <TextHeader />
      <GiftWrapper>
        {isStartVideo ? (
          <VideoBox src="/video/Random.mp4" muted autoPlay />
        ) : (
          <ImageDiv onClick={handleStartVideo}>Orange</ImageDiv>
        )}
        {/* <VideoBox src="/video/3.mp4" muted autoPlay /> */}
      </GiftWrapper>
      {/* <CardContainer>
        <Wrapper>
          <Front>Oragne</Front>
          <Back>Blue</Back>
        </Wrapper>
      </CardContainer> */}
    </>
  )
}

const GiftWrapper = styled.div`
  width: 100%;
  height: 60%;
  position: absolute;
  bottom: 0;
`

const VideoBox = styled.video`
  width: 100%;
`

const ImageDiv = styled.div`
  display: inline-block;
  width: 250px;
  height: 250px;
  background-color: orange;
  transition-duration: 1s;
`

// const CardContainer = styled.div`
//   perspective: 300px;
// `

// const Wrapper = styled.div`
//   /* transition-duration: 1s;
//   backface-visibility: hidden; */
// `

// const Front = styled.div`
//   background-color: orange;
//   transition-duration: 1s;
//   backface-visibility: hidden;
//   position: absolute;
//   width: 200px;
//   height: 200px;
//   &:hover {
//     transform: rotateY(180deg);
//   }
// `

// const Back = styled.div`
//   width: 200px;
//   height: 200px;
//   background-color: royalblue;
//   transition-duration: 1s;
//   backface-visibility: hidden;
//   transform: rotateY(-180deg);
//   &:hover {
//     transform: rotateY(0);
//   }
// `
export default random
