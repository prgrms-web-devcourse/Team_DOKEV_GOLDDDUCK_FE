import Header from '@domains/Header'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Image from '@components/Image'
import MUIButton from '@components/MUIButton'
import { useRouter } from 'next/dist/client/router'
import TimerHeader from '@domains/TimerHeader'
import Text from '@components/Text'
import { useCallback, useEffect, useState } from 'react'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'
import { getUesrInfo, getEvent } from '../api/user'
import { useUserContext } from '@contexts/UserProvider'
import useInterval from '@hooks/useInterval'

const startDate = new Date('12/13/2021')

const MOCK_DATA = {
  success: true,
  data: {
    eventId: 3,
    title: '테스트 선착순 이벤트!',
    giftChoiceType: 'FIFO',
    startAt: '2021-12-14T22:59:02.998853',
    endAt: '2021-12-18T15:02:02.998853',
    code: '1ffbec88-1356-404f-a933-d5fdb65de93a',
    eventProgressStatus: 'RUNNING',
    mainTemplate: 'template1',
    maxParticipantCount: 5,
    member: {
      id: 2,
      name: 'dokev_admin',
      email: null,
      socialId: 'k2',
      profileImage: 'http://dokev/image.jpg',
    },
    gifts: [
      {
        id: 3,
        category: '치킨',
        itemCount: 3,
        giftItems: [
          {
            id: 7,
            giftType: 'TEXT',
            content:
              '선물코드를 등록하여 선물을 받아보세요. (마르코 타운) ∙ 선물코드 : 3TLVAY2538 ∙ 선물명 : 카페아메리카노 ICED ∙ 코드등록 유효기간 : 2021.11.02 ∙ 코드등록 방법 : 카카오톡 > 선물하기 > 선물함 > 선물코드 등록 ∙ 등록 URL : http://kko.to/Aikttag4o',
            used: false,
          },
          {
            id: 8,
            giftType: 'TEXT',
            content: 'http://kko.to/Aikttag4o',
            used: false,
          },
          {
            id: 9,
            giftType: 'IMAGE',
            content:
              'https://dokev-gold-dduck.s3.ap-northeast-2.amazonaws.com/giftItemTest.jfif',
            used: false,
          },
        ],
      },
    ],
  },
  error: null,
  serverDateTime: '2021-12-14 16:45:26',
}

interface IMember {
  id: number
  name: string
  email: string | null
  socialId: string | null
  profileImage: string | null
}

interface IgiftItem {
  id: number
  giftType: string
  content: string
  used: boolean
}

interface Igifts {
  id: number
  category: string
  itemCount: number
  giftItems: IgiftItem[]
}

interface IeventData {
  eventId: number
  title: string
  giftChoiceType: string
  startAt: string
  endAt: string
  code: string
  eventProgressStatus: string
  mainTemplate: string
  maxParticipantCount: number
  member: IMember
  gifts: Igifts[]
}

// 이벤트 종료시 보여줄 JSX를 리턴하는 함수
const eventIsOver = () => {
  const EVENT_OVER_MESSAGE = '현재 종료된 \n 이벤트 입니다.'

  return (
    <>
      <EventIsOverContainer>
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
      </EventIsOverContainer>
    </>
  )
}

const fifo = (): JSX.Element => {
  const [eventStart, setEventStart] = useState(false)
  const [eventData, setEventData] = useState<IeventData | null>(null)
  const [eventOver, setEventOver] = useState(false)
  const [distance, setDistance] = useState(0)
  const router = useRouter()
  const { updateUser } = useUserContext()

  const onButtonClick = () => {
    if (eventStart) {
      // if '선물을 받은 사람인지 아닌지 체크!'
      // 선물 받기 전에 수량 체크 한번 더 해야함.
      // 수량 체크 해서 이상없으면 받고, 있으면 못받음! + 데이터 한번 더 받아야함.
      console.log('서버에 해당 선물 당첨자 저장')
      alert('선물 겟')
    } else {
      alert('지금은 선물을 받을 수 없어요!')
    }
  }

  const clear = useInterval(() => {
    checkRemaining()
  }, 1000)

  const checkRemaining = () => {
    if (eventData?.startAt) {
      const now = new Date()
      const eventStartAt = new Date(eventData?.startAt)
      const distance = Number(eventStartAt) - Number(now)
      setDistance(distance)
    }
  }

  useEffect(() => {
    if (distance < 0) {
      clear()
      setEventStart(true)
    }
  }, [distance])

  // 사용자 정보 API
  const getUserData = useCallback(async () => {
    const res = await getUesrInfo()
    res ? updateUser(res) : router.replace('/login')
  }, [])

  // 단일 이벤트 조회 API
  const getEventData = useCallback(async () => {
    //api 로직
    //이벤트 종료 여부 체크
    const res = await getEvent()
    if (res) {
      res.eventProgressStatus === 'CLOSED' && setEventOver(true)
      setEventData(res)
    }
    // console.log(MOCK_DATA.data)
    // setEventData(MOCK_DATA.data)
  }, [])

  useEffect(() => {
    getUserData()
    getEventData()
  }, [])

  return (
    <>
      <Header />
      {eventOver ? (
        eventIsOver()
      ) : (
        <>
          {eventData && (
            <TimerHeader
              eventStart={new Date(eventData.startAt)}
              eventMaster={eventData.member.name}
            />
          )}
          {/* <TimerHeader
            eventStart={new Date(eventData?.startAt)}
            eventMaster={'가가'}
          /> */}
          <GiftWrapper>
            {eventData &&
              eventData.gifts.map(
                ({ id, category, itemCount }: Igifts, index) => (
                  <Gift key={id}>
                    <Image
                      src={`/cover/cover${(index % 6) + 1}.png`}
                      width="60px"
                      height="60px"
                      mode="contain"
                    />
                    <GiftTextWrapper>
                      <Text size="MEDIUM" color="WHITE">
                        {category}
                      </Text>
                      <Text size="BASE" color="TEXT_GRAY_DARK">
                        수량 : {itemCount}개
                      </Text>
                    </GiftTextWrapper>
                    {itemCount ? (
                      <MUIButton
                        onClick={onButtonClick}
                        style={{ ...GetStyle }}>
                        GET
                      </MUIButton>
                    ) : (
                      <MUIButton style={{ ...SoldOutStyle }}>
                        SOLD OUT
                      </MUIButton>
                    )}
                  </Gift>
                ),
              )}
          </GiftWrapper>
        </>
      )}
    </>
  )
}

const GetStyle: React.CSSProperties = {
  color: COLORS.WHITE,
  fontSize: FONT_SIZES.MEDIUM,
  height: '36px',
  width: '40%',
  borderRadius: '50px',
  backgroundColor: COLORS.RED,
}

const SoldOutStyle: React.CSSProperties = {
  color: COLORS.GREEN,
  fontSize: FONT_SIZES.MEDIUM,
  height: '36px',
  width: '40%',
  borderRadius: '50px',
  background: 'none',
  cursor: 'not-allowed',
}

const GiftWrapper = styled.div`
  width: 100%;
  position: absolute;
  overflow: auto;
  bottom: 0;
  height: 45vh;
  @media all and (max-width: 425px) {
    height: 55vh;
  }
  @media all and (max-width: 320px) {
    height: 50vh;
  }
  padding-left: ${DEFAULT_MARGIN};
  padding-right: ${DEFAULT_MARGIN};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const Gift = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: ${DEFAULT_MARGIN};
  &:first-of-type {
    margin: 0;
  }
`

const GiftTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
`

const EventIsOverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default fifo
