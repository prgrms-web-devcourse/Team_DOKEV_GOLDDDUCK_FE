import React from 'react'
import styled from '@emotion/styled'
import Image from '@components/Image'
import eventType1 from '/public/eventType1.png'
import eventType2 from '/public/eventType2.png'
import { InputRadio } from '@components/Input'

interface Props {
  handleTypeCheck(e: React.ChangeEvent<HTMLInputElement>): void
  eventTypeState: string
}

const EventType = ({ eventTypeState, handleTypeCheck }: Props) => {
  return (
    <>
      <EventTypeContainer>
        <TypeDiv>
          <Image src={eventType1.src} width={378} height={120}></Image>
          <InputRadio
            id="random"
            value="random"
            name="random"
            checked={eventTypeState === 'random'}
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
          <Image src={eventType2.src} width={378} height={120}></Image>
          <InputRadio
            id="fifo"
            value="fifo"
            name="fifo"
            checked={eventTypeState === 'fifo'}
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
  /* position: absolute; */
  /* left: 0; */
  /* right: 0; */
  /* top: 0; */
  /* bottom: 0; */
  margin-top: 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const TypeDiv = styled.div`
  position: relative;
`

export default EventType
