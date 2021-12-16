import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import Text from '@components/Text'

interface ITimeInfo {
  start: string
  end: string
}

// 날짜 및 시간 포맷 함수
const formattedDate = (date: string): string[] => {
  const castingDate = new Date(date)

  return [
    `${castingDate.getFullYear()}년 ${
      castingDate.getMonth() + 1
    }월 ${castingDate.getDate()}일`,
    `${castingDate.getHours()}시 ${castingDate.getMinutes()}분 ${castingDate.getSeconds()}초`,
  ]
}

const TimeInfo = ({ start, end }: ITimeInfo): JSX.Element => {
  const Template = (props: { title: string; date: string }): JSX.Element => {
    return (
      <Wrapper>
        <Text>{props.title}</Text>
        <Text
          color="TEXT_GRAY_LIGHT"
          size="MICRO"
          style={{ marginTop: 16, marginBottom: 4 }}>
          {formattedDate(props.date)[0]}
        </Text>
        <Text size="MICRO" color="TEXT_GRAY_LIGHT">
          {formattedDate(props.date)[1]}
        </Text>
      </Wrapper>
    )
  }

  return (
    <EventTimeSection>
      <Template title="종료" date={start} />
      <Divider />
      <Template title="종료" date={end} />
    </EventTimeSection>
  )
}

const EventTimeSection = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
`

const Wrapper = styled.div`
  color: ${COLORS.WHITE};
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Divider = styled.div`
  width: 1px;
  height: 80%;
  background-color: ${COLORS.TEXT_GRAY_DARK};
`

export default TimeInfo
