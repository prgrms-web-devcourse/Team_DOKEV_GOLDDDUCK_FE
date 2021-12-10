import Timer from '@components/Timer'
import Text from '@components/Text'
import Header from '@domains/Header'
import Icon from '@components/Icon'
import MUIButton from '@components/MUIButton'
import Modal from '@components/Modal'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'

const MOCK = {
  eventId: 0,
  title: '데브코스 수료를 축하합니다!',
  code: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  startAt: '2021-12-09T10:53:39.275Z',
  endAt: '2021-12-09T10:53:39.274Z',
  eventProgressStatus: 'READY',
  giftChoiceType: 'FIFO',
  mainTemplate: '3',
  maxParticipantCount: 6,
  gifts: [
    {
      id: 1,
      category: '시원한 조개탕',
      itemCount: 4,
      giftItems: [
        {
          id: 0,
          content: '조개탕은 2차로~',
          giftType: 'TEXT',
          used: false,
        },
      ],
    },
  ],
  member: {
    email: 'dogaga@email.com',
    id: 10,
    name: '도가가',
    profileImage: '',
    socialId: '도가가가',
  },
}

const WINNER_MOCK = {
  data: [
    {
      category: '시원한 아이스아메리카노',
      users: [
        {
          id: 1,
          name: '파트로',
          email: 'adsf@email.com',
        },
        {
          id: 2,
          name: '문타리',
          email: 'adsf@email.com',
        },
      ],
    },
    {
      category: '리아 친필사인',
      members: [
        {
          id: 3,
          name: '도가가',
          email: 'adsf@email.com',
        },
        {
          id: 4,
          name: '윤쏘닉',
          email: 'adsf@email.com',
        },
        {
          id: 5,
          name: '조이',
          email: 'adsf@email.com',
        },
      ],
    },
    {
      category: '기팍팍 응원메세지',
      members: [
        {
          id: 3,
          name: '도가가',
          email: 'adsf@email.com',
        },
        {
          id: 6,
          name: '맹귄',
          email: 'adsf@email.com',
        },
        {
          id: 2,
          name: '문타리',
          email: 'adsf@email.com',
        },
        {
          id: 7,
          name: '로니',
          email: 'adsf@email.com',
        },
        {
          id: 8,
          name: '라엘',
          email: 'adsf@email.com',
        },
        {
          id: 9,
          name: '리아',
          email: 'adsf@email.com',
        },
        {
          id: 10,
          name: '스펜서',
          email: 'adsf@email.com',
        },
      ],
    },
  ],
}

const EventPage = () => {
  const router = useRouter()
  const {
    giftChoiceType: type,
    code,
    startAt: open,
    endAt: close,
    eventProgressStatus: status,
  } = MOCK
  const EVENT_LINK = `http://localhost:3000/${type.toLowerCase()}/${code}`

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(EVENT_LINK)
  }

  const formattedDate = (date: string): Array<string> => {
    const castingDate = new Date(date)

    return [
      `${castingDate.getFullYear()}년 ${castingDate.getMonth()}월 ${castingDate.getDate()}일`,
      `${castingDate.getHours()}시 ${castingDate.getMinutes()}분 ${castingDate.getSeconds()}초`,
    ]
  }

  return (
    <Wrapper>
      <Header />
      <EventContainer>
        <Icon
          name="arrowBack"
          size="LARGE"
          onIconClick={() => router.push('/mypage?tab=event')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            marginLeft: 16,
          }}
        />
        <CoverImage
          style={{
            backgroundImage: `url(/cover/cover${MOCK.mainTemplate}.png)`,
          }}>
          <Text
            color="BLACK"
            size="LARGE"
            style={{
              textAlign: 'center',
              wordBreak: 'keep-all',
              lineHeight: '1.5',
            }}>
            {MOCK.title}
          </Text>
          <MUIButton onClick={handleCopyUrl} style={{ ...copyBtnStyle }}>
            링크 복사
          </MUIButton>
          <Text color="TEXT_GRAY_DARK">
            {`${type === 'FIFO' ? '#선착순' : '#랜덤'} ${
              status === 'READY'
                ? '#준비중'
                : status === 'RUNNING'
                ? '#진행중'
                : '#종료됨'
            }`}
          </Text>
          <RemoveButton>
            <Icon
              name="remove"
              size="MEDIUM"
              style={{ margin: '10px 0 0 10px' }}
              onIconClick={() => {
                confirm(
                  '이벤트를 삭제하시겠습니까?\n삭제한 이벤트는 종료 처리되고 더 이상 확인할 수 없습니다.',
                ) && alert('삭제되었습니다')
              }}
            />
          </RemoveButton>
        </CoverImage>
        <EventTimeSection>
          <TimeInfo>
            <Text>오픈</Text>
            <Text
              color="TEXT_GRAY_LIGHT"
              size="MICRO"
              style={{ marginTop: 16, marginBottom: 4 }}>
              {formattedDate(open)[0]}
            </Text>
            <Text size="MICRO" color="TEXT_GRAY_LIGHT">
              {formattedDate(open)[1]}
            </Text>
          </TimeInfo>
          <Divider />
          <TimeInfo>
            <Text>종료</Text>
            <Text
              color="TEXT_GRAY_LIGHT"
              size="MICRO"
              style={{ marginTop: 16, marginBottom: 4 }}>
              {formattedDate(close)[0]}
            </Text>
            <Text size="MICRO" color="TEXT_GRAY_LIGHT">
              {formattedDate(close)[1]}
            </Text>
          </TimeInfo>
        </EventTimeSection>
        <WinnerSection>
          <Text>당첨자 확인</Text>
          <Icon name="pointDown" size="MEDIUM" />
        </WinnerSection>
      </EventContainer>
      <Modal>
        <MUIButton style={{ ...winnerBtnStyle }}>클릭</MUIButton>
        <Text color="WHITE">당첨자 목록</Text>
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${COLORS.BLACK};
  height: 100%;
`

const copyBtnStyle: React.CSSProperties = {
  backgroundColor: COLORS.RED,
  borderRadius: 20,
  lineHeight: 2,
}

const winnerBtnStyle: React.CSSProperties = {
  position: 'relative',
  bottom: 0,
  backgroundColor: COLORS.GREEN,
  borderRadius: 20,
  lineHeight: 2,
  margin: `${DEFAULT_MARGIN} 40%`,
}

const EventContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${DEFAULT_MARGIN};
  background-color: inherit;
`
const CoverImage = styled.div`
  position: relative;
  width: 70%;
  height: 400px;
  background-repeat: no-repeat;
  padding: 40px;
  background-size: cover;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const RemoveButton = styled.div`
  position: absolute;
  bottom: -1px;
  right: -1px;
  background-color: ${COLORS.BLACK};
  border-radius: 50px 0 0 0;
`

const EventTimeSection = styled.section`
  display: flex;
  margin: 10% 0;
  height: 80px;
  width: 80%;
`

const TimeInfo = styled.div`
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
  height: 100%;
  background-color: ${COLORS.TEXT_GRAY_DARK};
`

const WinnerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 10% 0;
  background-color: inherit;
`

export default EventPage
