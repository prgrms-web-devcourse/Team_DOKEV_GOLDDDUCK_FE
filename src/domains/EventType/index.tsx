import React from 'react'
import styled from '@emotion/styled'
import Image from '@components/Image'
import eventType1 from '/public/eventType1.png'
import eventType2 from '/public/eventType2.png'
import { InputRadio } from '@components/Input'

interface Props {
  handleTypeCheck(e: React.ChangeEvent<HTMLInputElement>): void
  giftChoiceType: string
}

const EventType = ({ giftChoiceType, handleTypeCheck }: Props) => {
  return (
    <>
      <EventTypeContainer>
        <TypeDiv>
          <label htmlFor="RANDOM">
            <Image src={eventType1.src} width="100%" height="100%" />
          </label>
          <InputRadio
            id="RANDOM"
            value="RANDOM"
            name="RANDOM"
            checked={giftChoiceType === 'RANDOM'}
            onChange={handleTypeCheck}
            style={{
              display: 'block',
              position: 'absolute',
              top: '40px',
              right: '20px',
            }}
          />
        </TypeDiv>

        <TypeDiv>
          <label htmlFor="FIFO">
            <Image src={eventType2.src} width="100%" height="100%" />
          </label>
          <InputRadio
            id="FIFO"
            value="FIFO"
            name="FIFO"
            checked={giftChoiceType === 'FIFO'}
            onChange={handleTypeCheck}
            style={{
              display: 'block',
              position: 'absolute',
              top: '40px',
              right: '20px',
            }}
          />
        </TypeDiv>
      </EventTypeContainer>
    </>
  )
}

const EventTypeContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
  padding: 8px;
`
const TypeDiv = styled.div`
  position: relative;
`

export default EventType
