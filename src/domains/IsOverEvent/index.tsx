import Text from '@components/Text'
import Image from '@components/Image'
import styled from '@emotion/styled'

const IsOverEvent = () => {
  const EVENT_OVER_MESSAGE = '현재 종료된 \n 이벤트 입니다.'

  return (
    <>
      <Container>
        <Text
          color="WHITE"
          style={{
            textAlign: 'center',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            fontSize: '3rem',
          }}>
          {EVENT_OVER_MESSAGE}
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

export default IsOverEvent
