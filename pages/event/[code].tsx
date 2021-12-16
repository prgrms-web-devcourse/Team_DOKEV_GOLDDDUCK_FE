import Header from '@domains/Header'
import Icon from '@components/Icon'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { useCallback, useEffect, useState } from 'react'
import { deleteEvent, getEventDetail } from '../api/event'
import { eventDetail } from '../api/services/event'
import {
  EVENT_FILTER,
  EVENT_TEMPLATE,
  EVENT_TYPE,
  IFilteredEventItem,
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

  // 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    setIsLoading(true)
    const data = await getUesrInfo()
    if (data) {
      updateUser(data)

      setIsLoading(false)
    } else {
      router.replace('/login')
    }
  }, [userId])

  useEffect(() => {
    fetchUser()
  }, [event])

  // 이벤트 데이터 조회
  const fetchEventDetail = useCallback(async (code) => {
    setIsLoading(true)

    const data = await getEventDetail(code)
    data && setEvent(eventDetail(data))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    userId && router.isReady && fetchEventDetail(router.query?.code)
  }, [userId, router.query.code])

  // 이벤트 삭제
  const handleClickRemove = useCallback((): void => {
    userId && event?._id && deleteEvent(userId.toString(), event._id)
    router.isReady && router.push('/mypage?tab=event')
  }, [userId, event, router?.query.code])

  return !isLoading && userId ? (
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
      <WinnerModal />
    </>
  ) : (
    <></>
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
