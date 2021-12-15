import Header from '@domains/Header'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Image from '@components/Image'
import MUIButton from '@components/MUIButton'
import { useRouter } from 'next/dist/client/router'
import TimerHeader from '@domains/TimerHeader'
import Text from '@components/Text'
import { useEffect, useState } from 'react'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'

const startDate = new Date('12/13/2021')

const MOCK_DATA = {
  id: 12345,
  eventCode: 'vllvlvla',
  eventTitle: '이벤트 제목',
  eventStart: startDate,
  eventMaster: '도가가',
  eventProgressStatus: 'IsOver',
  gifts: [
    { id: 1, giftTitle: '시언한 아이스 아메리카노', quantity: 10 },
    { id: 2, giftTitle: '리아 친필 싸인', quantity: 10 },
    { id: 3, giftTitle: '파트로 초코초코 파우더', quantity: 0 },
    { id: 4, giftTitle: '가가 맥주 세트', quantity: 0 },
    { id: 5, giftTitle: '문타리 사과', quantity: 10 },
    { id: 6, giftTitle: '스펜서 친필 싸인', quantity: 10 },
    { id: 7, giftTitle: '파트로 딸기딸기 파우더', quantity: 5 },
    { id: 8, giftTitle: '가가 소 세트', quantity: 3 },
    { id: 9, giftTitle: '시언한 아이스 아메리카노', quantity: 10 },
    { id: 10, giftTitle: '리아 친필 싸인', quantity: 10 },
    { id: 11, giftTitle: '파트로 나나바나나 파우더', quantity: 5 },
    { id: 12, giftTitle: '가가 양주 세트', quantity: 3 },
  ],
}

interface IeventData {
  id: number
  eventCode: string
  eventTitle: string
  eventStart: Date
  eventMaster: string
  eventProgressStatus: string
  gifts: object[]
}

interface IGift {
  id: number
  giftTitle: string
  quantity: number
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
  const [isOver, setIsOver] = useState(false)
  const [eventData, setEventData] = useState<IeventData | null>(null)
  const router = useRouter()
  let timer: NodeJS.Timer

  const initEvent = () => {
    //api 로직
    //이벤트 종료 여부 체크
    if (MOCK_DATA.eventProgressStatus === 'IsOver') {
      setIsOver(true)
    } else {
      setIsOver(false)
    }
    setEventData(() => MOCK_DATA)
  }

  const onButtonClick = () => {
    if (isOver) {
      // if '선물을 받은 사람인지 아닌지 체크!'
      // 선물 받기 전에 수량 체크 한번 더 해야함.
      // 수량 체크 해서 이상없으면 받고, 있으면 못받음! + 데이터 한번 더 받아야함.
      console.log('서버에 해당 선물 당첨자 저장')
      alert('선물 겟')
    } else {
      alert('지금은 선물을 받을 수 없어요!')
    }
  }

  const checkRemaining = () => {
    const now = new Date()
    const distance = Number(MOCK_DATA.eventStart) - Number(now)
    if (distance < 0) {
      clearTimeout(timer)
      setIsOver(true)
    }
  }

  useEffect(() => {
    initEvent()
    timer = setInterval(checkRemaining, 1000)
  }, [])

  return (
    <>
      <Header />
      {isOver ? (
        eventIsOver()
      ) : (
        <>
          <TimerHeader
            eventStart={MOCK_DATA.eventStart}
            eventMaster={MOCK_DATA.eventMaster}
          />
          <GiftWrapper>
            {eventData &&
              eventData.gifts.map(
                ({ id, giftTitle, quantity }: IGift, index) => (
                  <Gift key={id}>
                    <Image
                      src={`/templates/template${(index % 6) + 1}.png`}
                      width="60px"
                      height="60px"
                      mode="contain"
                    />
                    <GiftTextWrapper>
                      <Text size="MEDIUM" color="WHITE">
                        {giftTitle}
                      </Text>
                      <Text size="BASE" color="TEXT_GRAY_DARK">
                        수량 : {quantity}개
                      </Text>
                    </GiftTextWrapper>
                    {quantity ? (
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
  height: 60vh;
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
