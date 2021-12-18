import Image from '@components/Image'
import styled from '@emotion/styled'
import Text from '@components/Text'
import Header from '@domains/Header'

interface Iprops {
  state?: 'EVENT_OVER' | 'EVENT_INCORRECT'
  giftType?: '선착순' | '랜덤'
}

const EventStateChecker = ({ state, giftType }: Iprops): JSX.Element => {
  const EVENT_OVER_MESSAGE = '현재 종료된 \n 이벤트 입니다.'
  const EVENT_INCORRECT_MESSAGE = `해당 이벤트는 \n ${giftType} 전용 \n 이벤트 입니다.`
  const EVENT_NOT_FOUND = `존재하지 않는 \n 이벤트 입니다.`

  const checkStatus = () => {
    switch (state) {
      case 'EVENT_OVER':
        return EVENT_OVER_MESSAGE
      case 'EVENT_INCORRECT':
        return EVENT_INCORRECT_MESSAGE
      default:
        return EVENT_NOT_FOUND
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Text
          color="WHITE"
          style={{
            textAlign: 'center',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            fontSize: '3rem',
          }}>
          {checkStatus()}
        </Text>
        <Image src="/EventOver.png" width="100%" height="100%" />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default EventStateChecker
