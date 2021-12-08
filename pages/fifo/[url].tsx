import Header from '@domains/Header'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Image from '@components/Image'
import MUIButton from '@components/MUIButton'
import { useRouter } from 'next/dist/client/router'
import TimerHeader from '@domains/TimerHeader'
import Text from '@components/Text'
import { useEffect, useState } from 'react'

const startDate = new Date('12/11/2021')

const MOCK_DATA = {
  id: 12345,
  eventTitle: '이벤트 제목',
  eventStart: startDate,
  eventMaster: '도가가',
  gifts: [
    { id: 1, giftTitle: '시언한 아이스 아메리카노', quantity: 10 },
    { id: 2, giftTitle: '리아 친필 싸인', quantity: 10 },
    { id: 3, giftTitle: '파트로 초코초코 파우더', quantity: 5 },
    { id: 4, giftTitle: '가가 맥주 세트', quantity: 3 },
    { id: 5, giftTitle: '시언한 아이스 아메리카노', quantity: 10 },
    { id: 6, giftTitle: '리아 친필 싸인', quantity: 10 },
    { id: 7, giftTitle: '파트로 초코초코 파우더', quantity: 5 },
    { id: 8, giftTitle: '가가 맥주 세트', quantity: 3 },
    { id: 9, giftTitle: '시언한 아이스 아메리카노', quantity: 10 },
    { id: 10, giftTitle: '리아 친필 싸인', quantity: 10 },
    { id: 11, giftTitle: '파트로 초코초코 파우더', quantity: 5 },
    { id: 12, giftTitle: '가가 맥주 세트', quantity: 3 },
  ],
}

const fifo = () => {
  const [isOver, setIsOver] = useState(false)
  const router = useRouter()
  let timer: NodeJS.Timer

  const onButtonClick = () => {
    if (isOver) {
      alert('선물 겟')
    } else {
      alert('지금은 선물을 받을 수 없어요!')
    }
  }

  const checkRemaining = () => {
    const now = new Date()
    const distance = Number(MOCK_DATA.eventStart) - Number(now)
    console.log(distance)
    if (distance < 0) {
      clearTimeout(timer)
      setIsOver(true)
    }
  }

  useEffect(() => {
    timer = setInterval(checkRemaining, 1000)
  }, [])

  return (
    <>
      <Header />
      <TimerHeader />
      <GiftWrapper>
        {MOCK_DATA.gifts.map((gift, index) => (
          <Gift key={gift.id}>
            <Image
              src={`/cover/cover${(index % 6) + 1}.png`}
              width={'60px'}
              height={'60px'}
              mode="contain"
            />
            <GiftTextWrapper>
              <Text size="MEDIUM" color="WHITE">
                {gift.giftTitle}
              </Text>
              <Text size="BASE" color="TEXT_GRAY_DARK">
                수량 : {gift.quantity}개
              </Text>
            </GiftTextWrapper>
            <MUIButton onClick={onButtonClick} style={{ ...BtnStyle }}>
              GET
            </MUIButton>
          </Gift>
        ))}
      </GiftWrapper>
    </>
  )
}

const BtnStyle = {
  color: 'white',
  height: '36px',
  width: '86px',
  borderRadius: '50px',
  backgroundColor: 'red',
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

export default fifo
