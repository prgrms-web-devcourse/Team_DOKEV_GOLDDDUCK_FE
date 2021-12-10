import TimeInfo from './TimeInfo'
import Cover from './Cover'
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
    startAt: start,
    endAt: end,
    eventProgressStatus: status,
  } = MOCK

  return (
    <>
      <Header />
      <Icon
        name="arrowBack"
        size="LARGE"
        onIconClick={() => router.push('/mypage?tab=event')}
        style={{
          position: 'absolute',
          top: 108,
          left: DEFAULT_MARGIN,
        }}
      />
      <EventContainer>
        <Cover
          mainTemplate={MOCK.mainTemplate}
          title={MOCK.title}
          status={status}
          type={type}
          code={code}
        />
        <TimeInfo start={start} end={end} />
      </EventContainer>
      <WinnerSection>
        <Text>당첨자 확인</Text>
        <Icon name="pointDown" size="MEDIUM" />
        <Modal title="당첨자 목록" btnStyle={{ ...winnerBtnStyle }}>
          <MUIButton style={{ ...winnerBtnStyle }}>클릭</MUIButton>
          <Text>당첨자 확인</Text>
        </Modal>
      </WinnerSection>
    </>
  )
}

const winnerBtnStyle: React.CSSProperties = {
  backgroundColor: COLORS.GREEN,
  borderRadius: 20,
  lineHeight: 2,
}

const EventContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  height: 60%;
  margin: ${DEFAULT_MARGIN} auto;
`

const WinnerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  background-color: inherit;
  margin-top: 30px;
`

export default EventPage
