import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'

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
          transition: 'ease-in-out 1.6s',
        }}>
        {front}
      </div>
      <div
        onClick={handleCardFlip}
        style={{
          backfaceVisibility: 'hidden',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          transform: `rotateY(${flip ? 0 : -1620}deg)`,
          transition: 'ease-in-out 1.6s',
          backgroundColor: 'yellow',
          borderRadius: '8px',
        }}></div>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  position: relative;
  perspective: 1000px;
  width: 80%;
  margin: 0 auto;
`

export default CardFlip
