import styled from '@emotion/styled'
import { useState } from 'react'
import Image from '@components/Image'
import { COLORS } from '@utils/constants/colors'
import MUIButton from '@components/MUIButton'
import { keyframes } from '@emotion/react'

interface ICardFlip {
  front: any
}

const CardFlip = ({ front }: ICardFlip): JSX.Element => {
  const [flip, setFlip] = useState(true)

  const handleCardFlip = () => {
    setFlip((prev) => !prev)
  }

  return (
    <CardContainer>
      <div
        onClick={handleCardFlip}
        style={{
          backfaceVisibility: 'hidden',
          transform: `rotateY(${flip ? 1620 : 0}deg)`,
          transition: 'ease-out 1.6s',
          position: 'absolute',
          margin: '0 auto',
          width: '100%',
        }}>
        {front}
      </div>
      <div
        onClick={handleCardFlip}
        style={{
          backfaceVisibility: 'hidden',
          transform: `rotateY(${flip ? 0 : -1620}deg)`,
          transition: 'ease-out 1.6s',
          position: 'absolute',
        }}>
        <Image
          src="/card.jpg"
          width="100%"
          height="420px"
          mode="fill"
          style={{ margin: '0 auto', borderRadius: '8px' }}
        />
      </div>
      <FadeInWrapper style={{ display: flip ? 'none' : 'block' }}>
        <MUIButton style={{ ...BtnStyle }}>
          <a href="/test.jpeg" download>
            저장하기
          </a>
        </MUIButton>
      </FadeInWrapper>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  position: relative;
  perspective: 1000px;
  width: 80%;
  height: 60%;
  margin: 0 auto;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`
const FadeInWrapper = styled.div`
  animation: ${fadeIn} 3s ease-out;
`

const BtnStyle: React.CSSProperties = {
  width: '30%',
  borderRadius: '50px',
  position: 'absolute',
  left: '50%',
  bottom: '-20%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: COLORS.RED,
}

export default CardFlip