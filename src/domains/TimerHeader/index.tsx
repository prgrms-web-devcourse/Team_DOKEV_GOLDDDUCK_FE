import styled from '@emotion/styled'
import Text from '@components/Text'
import Timer from '@components/Timer'

interface ITimeHeader {
  eventStart: Date
  eventMaster: string
  message: string
}

const TimerHeader = ({
  eventStart,
  eventMaster,
  message,
}: ITimeHeader): JSX.Element => {
  return (
    <TimerHeaderContainer>
      <TextWrapper>
        <Text
          size="LARGE"
          color="WHITE"
          style={{
            display: 'inline',
            textDecoration: 'underline',
            fontWeight: 'bold',
          }}>
          {eventMaster}
        </Text>
        <Text size="MEDIUM" color="WHITE" style={{ display: 'inline' }}>
          님이 준비한 선물입니다!
        </Text>
      </TextWrapper>
      <TimerWrapper>
        <Timer size="LARGER" time={eventStart} />
        <Text size="MEDIUM" color="TEXT_GRAY_DARK" style={{ marginTop: '8px' }}>
          {message}
        </Text>
      </TimerWrapper>
    </TimerHeaderContainer>
  )
}

const TimerHeaderContainer = styled.div`
  margin: 0 auto;
  padding-top: 35%;
  @media all and (max-width: 425px) {
    padding-top: 20%;
  }
`

const TextWrapper = styled.div`
  width: 100%;
  text-align: center;
  white-space: nowrap;
`

const TimerWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  padding-top: 40px;
  @media all and (max-width: 425px) {
    padding-top: 24px;
  }
`

export default TimerHeader
