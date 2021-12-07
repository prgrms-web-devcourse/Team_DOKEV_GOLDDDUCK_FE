import Header from '@domains/Header'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN, FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'

const random = () => {
  return (
    <FifoContainer>
      <Header />
      <Text>텍스트 컴포넌트</Text>
      <Timer>타이머 컴포넌트</Timer>
      <TimerText>텍스트 컴포넌트</TimerText>
      <GiftWrapper>
        <VideoBox src="/video/gift.mp4" muted autoPlay />
      </GiftWrapper>
    </FifoContainer>
  )
}

const FifoContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`

const Text = styled.text`
  font-size: ${FONT_SIZES.MEDIUM};
  color: ${COLORS.WHITE};
  background-color: gray;
  position: absolute;
  top: 120px;
`

const Timer = styled.div`
  font-size: ${FONT_SIZES.LARGE};
  color: ${COLORS.WHITE};
  background-color: gray;
  position: absolute;
  top: 180px;
`

const TimerText = styled.text`
  font-size: ${FONT_SIZES.SMALL};
  color: ${COLORS.WHITE};
  background-color: gray;
  position: absolute;
  top: 200px;
`

const GiftWrapper = styled.div`
  width: 100%;
  position: absolute;
  overflow: auto;
  bottom: 0;
  height: 60vh;
  padding-left: ${DEFAULT_MARGIN};
  padding-right: ${DEFAULT_MARGIN};
  background-color: greenyellow;
`

const VideoBox = styled.video`
  width: 100%;
`

export default random
