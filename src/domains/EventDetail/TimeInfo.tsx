import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import Text from '@components/Text'

interface ITimeInfo {
  start: string
  end: string
}

const formattedDate = (date: string): Array<string> => {
  const castingDate = new Date(date)

  return [
    `${castingDate.getFullYear()}년 ${castingDate.getMonth()}월 ${castingDate.getDate()}일`,
    `${castingDate.getHours()}시 ${castingDate.getMinutes()}분 ${castingDate.getSeconds()}초`,
  ]
}

const TimeInfo = ({ start, end }: ITimeInfo): JSX.Element => {
  return (
    <EventTimeSection>
      <Wrapper>
        <Text>오픈</Text>
        <Text
          color="TEXT_GRAY_LIGHT"
          size="MICRO"
          style={{ marginTop: 16, marginBottom: 4 }}>
          {formattedDate(start)[0]}
        </Text>
        <Text size="MICRO" color="TEXT_GRAY_LIGHT">
          {formattedDate(start)[1]}
        </Text>
      </Wrapper>
      <Divider />
      <Wrapper>
        <Text>종료</Text>
        <Text
          color="TEXT_GRAY_LIGHT"
          size="MICRO"
          style={{ marginTop: 16, marginBottom: 4 }}>
          {formattedDate(end)[0]}
        </Text>
        <Text size="MICRO" color="TEXT_GRAY_LIGHT">
          {formattedDate(end)[1]}
        </Text>
      </Wrapper>
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
