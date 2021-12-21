import React from 'react'
import styled from '@emotion/styled'
import Image from '@components/Image'
import eventType1 from '/public/eventType1.png'
import eventType2 from '/public/eventType2.png'
import { InputRadio } from '@components/Input'
import TYPE_IMAGE from '/public/event_type.png'

interface Props {
  handleTypeCheck(e: React.ChangeEvent<HTMLInputElement>): void
  giftChoiceType: string
}

const EventType = ({ giftChoiceType, handleTypeCheck }: Props) => {
  return (
    <>
      <EventTypeContainer>
        <Image
          src={TYPE_IMAGE.src}
          width="280px"
          height="320px"
          style={{ objectFit: 'contain' }}
        />
        <TypeDiv>
          <label htmlFor="RANDOM">
            {/* <Image src={eventType1.src} width={378} height={120}></Image> */}
            <InputRadio
              id="RANDOM"
              value="RANDOM"
              name="RANDOM"
              checked={giftChoiceType === 'RANDOM'}
              onChange={handleTypeCheck}
            />
          </label>
          <label htmlFor="FIFO">
            {/* <Image src={eventType2.src} width={378} height={120}></Image> */}
            <InputRadio
              id="FIFO"
              value="FIFO"
              name="FIFO"
              checked={giftChoiceType === 'FIFO'}
              onChange={handleTypeCheck}
            />
          </label>
        </TypeDiv>
      </EventTypeContainer>
    </>
  )
}

const EventTypeContainer = styled.div`
  display: flex;
  height: calc(100% - 136px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`
const TypeDiv = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-around;
`

export default EventType
