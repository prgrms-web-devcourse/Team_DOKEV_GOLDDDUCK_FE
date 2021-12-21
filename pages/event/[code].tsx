import Header from '@domains/Header'
import Icon from '@components/Icon'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import Text from '@components/Text'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { useCallback, useEffect, useState } from 'react'
import { deleteEvent, getEventDetail, getEventWinners } from '../api/event'
import { eventDetail, eventWinnerList } from '../api/services/event'
import {
  EVENT_FILTER,
  EVENT_TEMPLATE,
  EVENT_TYPE,
  IFilteredEventItem,
  IFilteredWinnerList,
} from 'types/event'
import { getUserInfo } from '../api/user'
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

const INFO_MESSAGE = '※ 이벤트가 종료되면당첨자 목록을 확인할 수 있어요!'

const EventPage = (): JSX.Element => {
  const router = useRouter()
  const { user, updateUser } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const [event, setEvent] = useState<IFilteredEventItem | undefined>()
  const [winners, setWinners] = useState<IFilteredWinnerList[] | undefined>()

  // 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    const data = await getUserInfo()
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
      if (user?.id) {
        setIsLoading(true)

        const data = await getEventDetail(code)
        data && setEvent(eventDetail(data))

        setIsLoading(false)
      }
    },
    [user?.id],
  )

  useEffect(() => {
    fetchEventDetail(router.query?.code)
  }, [user?.id, router.query.code])

  // 이벤트 삭제
  const handleClickRemove = useCallback(async () => {
    user?.id && event?._id && (await deleteEvent(user?.id, event._id))
  }, [user?.id, event])

  // 당첨자 목록 조회
  const fetchEventWinners = useCallback(async () => {
    if (user?.id && event?._id && event?.status === 'CLOSED') {
      setIsLoading(true)
      const data = await getEventWinners(user?.id, event?._id)
      data && setWinners(eventWinnerList(data))

      setIsLoading(false)
    }
  }, [user?.id, event])

  useEffect(() => {
    fetchEventWinners()
  }, [user?.id, event?._id])

  return !isLoading && user?.id ? (
    <Wrapper>
      <Header />
      <EventContainer>
        <Icon
          name="arrowBack"
          size="LARGE"
          onIconClick={() =>
            router.push(
              `/mypage?tab=event&filter=${event?.status.toLocaleLowerCase()}`,
            )
          }
          style={{
            position: 'absolute',
            top: 0,
            left: 16,
          }}
        />
        <Cover
          template={event?.template as EVENT_TEMPLATE}
          title={event?.title as string}
          status={event?.status as EVENT_FILTER}
          eventType={event?.eventType as EVENT_TYPE}
          code={event?.code as string}
          onRemoveEvent={handleClickRemove}
        />
        <TimeInfo start={event?.start as string} end={event?.end as string} />
      </EventContainer>

      {event?.status === 'CLOSED' ? (
        <WinnerModal winners={winners || []} />
      ) : (
        <Text
          color="TEXT_GRAY_DARK"
          size="MICRO"
          style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
          {INFO_MESSAGE}
        </Text>
      )}
    </Wrapper>
  ) : (
    <></>
  )
}

const Wrapper = styled.div`
  background-color: inherit;
  height: 100vh;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const EventContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  margin: ${DEFAULT_MARGIN} auto;
  gap: 16px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

export default EventPage
