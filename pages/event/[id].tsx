import Timer from '@components/Timer'
import Text from '@components/Text'
import Header from '@domains/Header'
import Icon from '@components/Icon'
import MUIButton from '@components/MUIButton'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'
import { useCallback, useState } from 'react'
import { css } from '@emotion/react'

const MOCK_DATA = {
  id: 1,
  type: 'fifo',
  cover: '1',
  title: '데브코스 1기 수료를 축하합니다!',
  code: 'einaldasdfsdfefdf',
  open: new Date('Dec 24 2021 12:24:00 GMT+0900 (한국 표준시)'),
  close: new Date('Jan 1 2022 1:1:1 GMT+0900 (한국 표준시)'),
  isClosed: false,
  winnerList: [
    {
      gift: '시원한 아이스아메리카노',
      winners: [
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
      gift: '리아 친필사인',
      winners: [
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
      gift: '기팍팍 응원메세지',
      winners: [
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
  const eventData = MOCK_DATA
  const router = useRouter()
  const EVENT_LINK = `http://localhost:3000/${eventData.type}/${eventData.code}`

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(EVENT_LINK)
  }

  const formattedDate = (date: Date): Array<string> => {
    return [
      `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`,
      `${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`,
    ]
  }

  return (
    <>
      <Header />
      <EventContainer>
        <Icon
          name="arrowBack"
          size="LARGE"
          color="WHITE"
          onIconClick={() => router.push('/mypage?tab=event')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <CoverImage
          style={{
            backgroundImage: `url(/cover/cover${eventData.cover}.png)`,
          }}>
          <Text
            color="BLACK"
            size="LARGE"
            style={{
              textAlign: 'center',
              wordBreak: 'keep-all',
              lineHeight: '1.5',
            }}>
            {eventData.title}
          </Text>
          <MUIButton onClick={handleCopyUrl} style={{ ...copyBtnStyle }}>
            링크 복사
          </MUIButton>
        </CoverImage>
        <EventTimeInfo>
          <TimeWrapper>
            <Text>오픈</Text>
            <Text
              color="TEXT_GRAY_LIGHT"
              size="MICRO"
              style={{ textAlign: 'center', marginTop: 16, marginBottom: 4 }}>
              {formattedDate(eventData.open)[0]}
            </Text>
            <Text
              size="MICRO"
              color="TEXT_GRAY_LIGHT"
              style={{ textAlign: 'center' }}>
              {formattedDate(eventData.open)[1]}
            </Text>
          </TimeWrapper>
          <Divider />
          <TimeWrapper>
            <Text>종료</Text>
            <Text
              color="TEXT_GRAY_LIGHT"
              size="MICRO"
              style={{ textAlign: 'center', marginTop: 16, marginBottom: 4 }}>
              {formattedDate(eventData.close)[0]}
            </Text>
            <Text
              size="MICRO"
              color="TEXT_GRAY_LIGHT"
              style={{ textAlign: 'center' }}>
              {formattedDate(eventData.close)[1]}
            </Text>
          </TimeWrapper>
        </EventTimeInfo>
        <MUIButton
          variant="outlined"
          onClick={() => {
            confirm(
              '이벤트를 삭제하시겠습니까?\n삭제한 이벤트는 종료 처리되고 더 이상 확인할 수 없습니다.',
            ) && alert('삭제되었습니다')
          }}
          sx={{
            borderColor: COLORS.TEXT_GRAY_DARK,
            color: COLORS.TEXT_GRAY_DARK,
            '&:hover': {
              borderColor: COLORS.RED,
              color: COLORS.RED,
            },
          }}>
          이벤트 삭제
        </MUIButton>
      </EventContainer>
    </>
  )
}

const copyBtnStyle: React.CSSProperties = {
  backgroundColor: COLORS.RED,
  borderRadius: 20,
}

const EventContainer = styled.div`
  margin: ${DEFAULT_MARGIN};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: inherit;
`
const CoverImage = styled.div`
  width: 300px;
  height: 400px;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const EventTimeInfo = styled.div`
  display: flex;
  margin: ${DEFAULT_MARGIN} 0;
  height: 80px;
  width: 300px;
`

const TimeWrapper = styled.section`
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

export default EventPage
