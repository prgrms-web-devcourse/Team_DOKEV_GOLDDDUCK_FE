import Header from '@domains/Header'
import styled from '@emotion/styled'
import TextHeader from '@domains/TimerHeader'
import { useCallback, useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'
import Slider from '@mui/material/Slider'
import CardFlip from '@domains/CardFlip'
import IsOverEvent from '@domains/IsOverEvent'
import useInterval from '@hooks/useInterval'
import { getUesrInfo } from '../api/user'
import { useUserContext } from '@contexts/UserProvider'
import { getEvent, postRandomGiftReceipt } from '../api/event'
import { useRouter } from 'next/router'
import { GIFT_TYPE, IGiftItem } from 'types/gift'
import GiftItem from '@domains/GiftItem'
import { EVENT_TEMPLATE } from 'types/event'

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

const random = (): JSX.Element => {
  const [eventStart, setEventStart] = useState(false)
  const [eventData, setEventData] = useState<IeventData | null>(null)
  const [eventOver, setEventOver] = useState(false)
  const [distance, setDistance] = useState(0)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const [muiSlider, setMuiSlider] = useState(0)
  const [giftItem, setGiftItem] = useState<IGiftItem | null>(null)
  const { user, updateUser } = useUserContext()
  const router = useRouter()

  const handleSliderChange = useCallback(
    (e: Event, newValue: number) => {
      if (newValue === 100 && eventStart) {
        setMuiSlider(newValue)
      }
    },
    [eventStart],
  )

  // 선물 수령 API
  const postGiftReceipt = useCallback(async () => {
    if (muiSlider === 100 && eventStart && eventData) {
      const eventId = eventData.eventId
      const memberId = user.id //선물을 받는 유저의 ID
      const res = await postRandomGiftReceipt({ eventId, memberId })
      if (Array.isArray(res)) {
        console.log('error', res)
        //res = ['E002', '이미 참여한 이벤트입니다.']
        const errorMessage = res[1]
        alert(errorMessage)
      } else {
        // 선물 수령 완료 이후
        console.log('pass', res)
        setGiftItem(res)
        setIsVideoLoading(true)
      }
    }
  }, [muiSlider])

  // 단 1회 선물 수령 API 요청
  useEffect(() => {
    postGiftReceipt()
  }, [muiSlider])

  // setInterval Clear 함수
  const clear = useInterval(() => {
    checkRemaining()
  }, 1000)

  // 남아있는 시간 체크 함수 (현재 시간 - 이벤트 시작 시간)
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
    const res = await getUesrInfo()
    res ? updateUser(res) : router.replace('/login')
  }, [])

  // 단일 이벤트 조회 API
  const getEventData = useCallback(async () => {
    const res = await getEvent()
    if (res) {
      res.eventProgressStatus === 'CLOSED' && setEventOver(true)
      setEventData(res)
    }
  }, [router])

  // 컴포넌트 마운트 시 로그인 체크 & 단일 이벤트 정보 가져오기
  useEffect(() => {
    getUserData()
    getEventData()
  }, [])

  return (
    <>
      {eventOver ? (
        IsOverEvent()
      ) : (
        <>
          <Header />
          {eventData && (
            <TextHeader
              eventStart={new Date(eventData.startAt)}
              eventMaster={eventData.member.name}
            />
          )}
          {isVideoEnded && giftItem && (
            <FadeInDownWrapper>
              <CardFlip
                url={giftItem.content}
                type={giftItem.giftType as GIFT_TYPE}
                front={
                  giftItem.giftType === 'IMAGE' ? (
                    <GiftItem
                      type="IMAGE"
                      imageSrc={giftItem.content}
                      imageStyle={{
                        width: '100%',
                        height: '420px',
                        margin: '0 auto',
                        borderRadius: '8px',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <GiftItem
                      type="TEXT"
                      template={giftItem.mainTemplate as EVENT_TEMPLATE}
                      message={giftItem.content}
                    />
                  )
                }
              />
            </FadeInDownWrapper>
          )}
          {isVideoLoading ? (
            <FadeInWrapper>
              <VideoBox
                src="/video/Stars.mp4"
                muted
                autoPlay
                onEnded={() => setIsVideoEnded(true)}
              />
            </FadeInWrapper>
          ) : (
            <SliderWrapper>
              <CustomSlider
                disabled={eventStart ? false : true}
                aria-label="Temperature"
                onChange={handleSliderChange}
                color="secondary"
                sx={{
                  backgroundColor: 'transparent',
                  border: `3px solid ${COLORS.TEXT_GRAY_LIGHT}`,
                  height: '22px',
                  width: '100%',
                }}
              />
              <StyledText>밀어서 랜덤 선물받기</StyledText>
            </SliderWrapper>
          )}
        </>
      )}
    </>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    }
`

const FadeInWrapper = styled.div`
  animation: ${fadeIn} 2s ease-out;
`

const FadeInDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  animation: ${fadeInDown} 2s ease-out;
`

const VideoBox = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  bottom: 0;
`

const SliderWrapper = styled.div`
  right: 0;
  width: 60%;
  margin: 0 auto;
  position: absolute;
  top: 70%;
  left: 0;
  @media all and (max-width: 425px) {
    top: 55%;
  }
  @media all and (max-width: 320px) {
    top: 60%;
  }
`

const CustomSlider = styled(Slider)(() => ({
  '& .MuiSlider-rail, & .MuiSlider-track': {
    backgroundColor: 'transparent',
    border: 'none',
  },
  '& .MuiSlider-thumbColorSecondary.MuiSlider-thumbSizeMedium.MuiSlider-thumb':
    {
      backgroundColor: 'transparent',
      backgroundImage: 'url(/giftrudolf.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '120px',
      height: '120px',
      border: 'none',
      boxShadow: 'none',
      zIndex: 99,
    },
}))

const StyledText = styled.div`
  position: absolute;
  font-size: ${FONT_SIZES.LARGE};
  top: 10%;
  right: -50px;
  transform: translate(-50%, 50%);
  background-image: linear-gradient(90deg, #111, #fff, #111);
  background-repeat: no-repeat;
  background-clip: text;
  background-size: 80% 100%;
  --webkit-backdrop-clip: text;
  color: transparent;
  animation: shine 2s linear infinite;
  @keyframes shine {
    0% {
      background-position: -500% 0;
    }
    100% {
      background-position: 500% 0;
    }
  }
`

export default random
