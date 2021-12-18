import Header from '@domains/Header'
import Icon from '@components/Icon'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { useCallback, useEffect, useState } from 'react'
import { deleteEvent, getEventDetail, getEventWinners } from '../api/event'
import { eventDetail, eventWinnerList } from '../api/services/event'
import {
  EVENT_FILTER,
  EVENT_TEMPLATE,
  EVENT_TYPE,
  IFilteredEventItem,
  IFilteredWinners,
} from 'types/event'
import { getUesrInfo } from '../api/user'
import { useUserContext } from '@contexts/UserProvider'
import dynamic from 'next/dynamic'
const TimeInfo = dynamic(() => import('@domains/EventDetail/TimeInfo'), {
  ssr: false,
})
const Cover = dynamic(() => import('@domains/EventDetail/Cover'), {
  ssr: false,
})
const WinnerModal = dynamic(() => import('@domains/EventDetail/WinnerModal'), {
  ssr: false,
})

const EventPage = (): JSX.Element => {
  const router = useRouter()
  const { updateUser } = useUserContext()
  const { id: userId } = useUserContext().user
  const [isLoading, setIsLoading] = useState(false)
  const [event, setEvent] = useState<IFilteredEventItem | undefined>()
  const [winners, setWinners] = useState<IFilteredWinners[] | undefined>()

  // 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    const data = await getUesrInfo()
    if (data) {
      updateUser(data)
    } else {
      router.replace('/login')
    }
  }, [router])

  useEffect(() => {
    fetchUser()
  }, [])

  // 이벤트 데이터 조회
  const fetchEventDetail = useCallback(
    async (code) => {
      if (userId) {
        setIsLoading(true)

        const data = await getEventDetail(code)
        data && setEvent(eventDetail(data))

        setIsLoading(false)
      }
    },
    [userId],
  )

  useEffect(() => {
    fetchEventDetail(router.query?.code)
  }, [userId, router.query.code])

  // 이벤트 삭제
  const handleClickRemove = useCallback(async () => {
    userId && event?._id && (await deleteEvent(userId, event._id))
  }, [userId, event])

  // 당첨자 목록 조회
  const fetchEventWinners = useCallback(async () => {
    if (userId && event?._id) {
      setIsLoading(true)
      console.log(456)
      const data = await getEventWinners(userId, event?._id)
      data && setWinners(eventWinnerList(data))

      setIsLoading(false)
    }
  }, [userId, event])

  useEffect(() => {
    fetchEventWinners()
  }, [userId, event?._id])

  return !isLoading && userId ? (
    <Wrapper>
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
          template={event?.template as EVENT_TEMPLATE}
          title={event?.title as string}
          status={event?.status as EVENT_FILTER}
          eventType={event?.eventType as EVENT_TYPE}
          code={event?.code as string}
          id={event?._id as string}
          onRemoveEvent={handleClickRemove}
        />
        <TimeInfo start={event?.start as string} end={event?.end as string} />
      </EventContainer>
      <WinnerModal
        winners={winners || []}
        isClosed={event?.status === 'CLOSED' ? true : false}
      />
    </Wrapper>
  ) : (
    <></>
  )
}

const Wrapper = styled.div`
  background-color: inherit;
  padding-bottom: 16px;
  height: 100vh;
`

const EventContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 60%;
  margin: ${DEFAULT_MARGIN} auto;
  gap: 16px;
`

export default EventPage
