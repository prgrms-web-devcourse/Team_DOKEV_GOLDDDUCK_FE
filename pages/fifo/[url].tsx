import Header from '@domains/Header'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN, FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'
import Image from '@components/Image'
import MUIButton from '@components/MUIButton'
import { useRouter } from 'next/dist/client/router'
import TimerHeader from '@domains/TimerHeader'

const fifo = () => {
  const router = useRouter()
  console.log('router', router)
  const onButtonClick = () => {
    alert('안녕')
  }

  return (
    <>
      <Header />
      <TimerHeader />
      <GiftWrapper>
        <Gift>
          <Image
            src="/vercel.svg"
            width={'60px'}
            height={'60px'}
            mode="contain"
            style={{ backgroundColor: 'white' }}
          />
          <GiftTextWrapper>
            <GiftTitle>시원한 아이스 아메리카노</GiftTitle>
            <GiftQuantity>수량 : 5개</GiftQuantity>
          </GiftTextWrapper>
          <MUIButton
            onClick={onButtonClick}
            style={{
              color: 'white',
              height: '36px',
              width: '86px',
              borderRadius: '50px',
              backgroundColor: 'red',
            }}>
            GET
          </MUIButton>
        </Gift>
      </GiftWrapper>
    </>
  )
}

const GiftWrapper = styled.div`
  width: 100%;
  position: absolute;
  overflow: auto;
  bottom: 0;
  height: 60vh;
  padding-left: ${DEFAULT_MARGIN};
  padding-right: ${DEFAULT_MARGIN};
`

const Gift = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: ${DEFAULT_MARGIN};
  background-color: green;
  &:first-of-type {
    margin: 0;
  }
`

const GiftTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const GiftTitle = styled.text`
  font-size: ${FONT_SIZES.BASE};
  color: ${COLORS.WHITE};
  background-color: gray;
`

const GiftQuantity = styled.text`
  font-size: ${FONT_SIZES.SMALL};
  color: ${COLORS.TEXT_BLACK};
  background-color: gray;
`

export default fifo
