import Header from '@domains/Header'
import Icon from '@components/Icon'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { EVENT_STATUS, EVENT_TEMPLATE, EVENT_TYPE } from 'types/event'
import { TimeInfo, Cover, WinnerModal } from '@domains/EventDetail'

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

const EventPage = (): JSX.Element => {
  const router = useRouter()
  const {
    mainTemplate: template,
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
          mainTemplate={template as EVENT_TEMPLATE}
          title={MOCK.title}
          status={status as EVENT_STATUS}
          type={type as EVENT_TYPE}
          code={code}
        />
        <TimeInfo start={start} end={end} />
      </EventContainer>
      <WinnerModal />
    </>
  )
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

export default EventPage
