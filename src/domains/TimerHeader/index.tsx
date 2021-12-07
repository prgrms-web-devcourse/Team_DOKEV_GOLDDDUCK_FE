import styled from '@emotion/styled'
import Text from '@components/Text'
import Timer from '@components/Timer'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

const startDate = new Date(2021, 12, 8, 0, 0, 0)

const MOCK_TIMER_DATA = {
  eventStart: startDate,
  eventMaster: '도가가',
}

const TimerHeader = (): JSX.Element => {
  const router = useRouter()

  useEffect(() => {
    console.log('TimerHeader', router)
    console.log('GetParams', router.query['url'])
  }, [router])

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
          {MOCK_TIMER_DATA.eventMaster}
        </Text>
        <Text size="LARGE" color="WHITE" style={{ display: 'inline' }}>
          님이 준비한 선물입니다!
        </Text>
      </TextWrapper>
      <TimerWrapper>
        <Timer size="LARGER" time={MOCK_TIMER_DATA.eventStart} />
        <Text size="MEDIUM" color="TEXT_GRAY_DARK" style={{ marginTop: '8px' }}>
          선착순이니 서둘러주세요!!
        </Text>
      </TimerWrapper>
    </TimerHeaderContainer>
  )
}

const TimerHeaderContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 35%;
  @media all and (max-width: 425px) {
    margin-top: 20%;
  }
`

const TextWrapper = styled.div`
  width: 100%;
  text-align: center;
`

const TimerWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  text-align: center;
  margin-top: 40px;
  @media all and (max-width: 425px) {
    margin-top: 24px;
  }
`

export default TimerHeader
