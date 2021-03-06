import { ErrorAlert, GiftGetAlert } from '@components/Swalert'
import EventStateChecker from '@domains/EventStateChecker'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { getEvent, postGiftReceipt } from '../api/event'
import { useCallback, useEffect, useState } from 'react'
import { useUserContext } from '@contexts/UserProvider'
import { FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'
import TimerHeader from '@domains/TimerHeader'
import MUIButton from '@components/MUIButton'
import useInterval from '@hooks/useInterval'
import Spinner from '@components/Spinner'
import { getUserInfo } from '../api/user'
import { useRouter } from 'next/router'
import Image from '@components/Image'
import Header from '@domains/Header'
import styled from '@emotion/styled'
import Text from '@components/Text'

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
  soldOut: boolean
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

const fifo = (): JSX.Element => {
  const [eventStart, setEventStart] = useState(false)
  const [eventData, setEventData] = useState<IeventData | null>(null)
  const [eventOver, setEventOver] = useState(false)
  const [distance, setDistance] = useState(0)
  const [isFifo, setIsFifo] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user, updateUser } = useUserContext()

  // 선물 수령 API
  const handleGiftReceipt = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!eventStart || !eventData) {
        ErrorAlert('지금은 선물을 받을 수 없어요!')

        return
      }
      if (eventStart && eventData) {
        const eventId = eventData.eventId
        const masterId = eventData.member.id
        const giftId = parseInt((e.target as HTMLElement).id, 10) // 카테고리 ID
        const memberId = user.id
        if (masterId === memberId) {
          ErrorAlert('선물은 참가자들에게 양보해주세요!!')

          return
        }
        const res = await postGiftReceipt({ eventId, giftId, memberId })
        if (Array.isArray(res)) {
          if (res[0] === 'G002') {
            ErrorAlert('재고가 없습니다!')

            return
          }
          const errorMessage = res[1]
          ErrorAlert(errorMessage)
        } else {
          if (await GiftGetAlert('선물 당첨!!')) {
            router.push(`/gift/${res.id}`)
          }
        }
      }
    },
    [eventStart],
  )

  // setInterval Clear 함수
  const clear = useInterval(() => {
    checkRemaining()
  }, 1000)

  // 남아있는 시간 체크 함수 (이벤트 시작 시간 - 현재 시간)
  const checkRemaining = useCallback(() => {
    if (eventData?.startAt) {
      const now = new Date()
      const eventStartAt = new Date(eventData.startAt)
      const distance = Number(eventStartAt) - Number(now)
      setDistance(distance)
    }
  }, [eventData])

  // 남아있는 시간이 0 미만이 될 경우, setInterval 클리어 함수 실행 및 상태 변경
  useEffect(() => {
    if (distance < 0) {
      clear()
      setEventStart(true)
    }
  }, [distance])

  // 사용자 정보 API
  const getUserData = useCallback(async () => {
    console.log(router)
    const res = await getUserInfo()
    if (res) {
      updateUser(res)
    } else {
      sessionStorage.setItem('next_url', `/fifo/${router?.query['url']}`)
      router.push('/login')
    }
  }, [router])

  // 단일 이벤트 조회 API
  const getEventData = useCallback(async () => {
    if (router.query['url']) {
      setIsLoading(true)
      const eventCode = router.query['url']
      const res = await getEvent(eventCode)
      if (res) {
        res.eventProgressStatus === 'CLOSED' && setEventOver(true)
        res.giftChoiceType !== 'FIFO' && setIsFifo(false)
        setEventData(res)
      }
      setIsLoading(false)
    }
  }, [router])

  // 컴포넌트 마운트 시 로그인 체크 & 단일 이벤트 정보 가져오기
  useEffect(() => {
    getUserData()
    getEventData()
  }, [router])

  return !isLoading && user.id ? (
    eventOver ? (
      <EventStateChecker state="EVENT_OVER" />
    ) : !isFifo ? (
      <EventStateChecker state="EVENT_INCORRECT" giftType="랜덤" />
    ) : !eventData ? (
      <EventStateChecker />
    ) : (
      <>
        <Header />
        <TimerHeader
          eventStart={new Date(eventData.startAt)}
          eventMaster={eventData.member.name}
          message="선택의 기회는 단 한 번뿐!"
        />
        <GiftWrapper>
          {eventData.gifts.map(
            ({ id, category, itemCount, soldOut }: Igifts, index) => (
              <Gift key={id}>
                <Image
                  src={`/gifts/gift${(index % 8) + 1}.png`}
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
                {!soldOut ? (
                  <MUIButton
                    id={String(id)}
                    onClick={handleGiftReceipt}
                    style={{ ...GetStyle }}>
                    GET
                  </MUIButton>
                ) : (
                  <MUIButton style={{ ...SoldOutStyle }}>SOLD OUT</MUIButton>
                )}
              </Gift>
            ),
          )}
        </GiftWrapper>
      </>
    )
  ) : (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <Spinner />
    </div>
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
  whiteSpace: 'nowrap',
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

export default fifo
