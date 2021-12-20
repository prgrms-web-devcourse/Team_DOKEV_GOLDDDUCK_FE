import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Image from '@components/Image'
import Text from '@components/Text'
import Header from '@domains/Header'
import MUIButton from '@components/MUIButton'

interface Props {
  eventLink: string
  giftChoiceType: string
}

interface Message {
  copyMessage: boolean
}

const EventComplete = ({ eventLink, giftChoiceType }: Props) => {
  const [copyMessage, setCopyMessage] = useState(false)
  let host = ''

  if (typeof window !== 'undefined') {
    host = window.location.host
  }

  const handleCopy = () => {
    copy(
      giftChoiceType === 'FIFO'
        ? `${host}/fifo/${eventLink}`
        : `${host}/random/${eventLink}`,
    )
    setCopyMessage(true)

    setTimeout(() => {
      setCopyMessage(false)
    }, 1000)
  }

  return (
    <>
      <Header />

      <EventCompleteContainer>
        {!!eventLink && host ? (
          <>
            <Text style={{ textAlign: 'center' }} size="LARGE">
              링크가 생성되었습니다
            </Text>

            <Text style={{ textAlign: 'center', marginTop: '5%' }} size="LARGE">
              이제 선물을 전달해보세요!
            </Text>

            <Div>
              <Image src="/roudolf.png"></Image>
            </Div>

            <Div>
              <Text
                size="MEDIUM"
                style={{ textAlign: 'center', padding: '0 10%' }}>
                {giftChoiceType === 'FIFO'
                  ? `${host}/fifo/${eventLink}`
                  : `${host}/random/${eventLink}`}
              </Text>
            </Div>

            <Div>
              <MUIButton
                style={{ backgroundColor: '#CE000B' }}
                onClick={handleCopy}>
                링크 복사
              </MUIButton>
            </Div>

            <DisplayStyle copyMessage={copyMessage}>
              <Div>
                <Text size="SMALL">복사 완료</Text>
              </Div>
            </DisplayStyle>
          </>
        ) : (
          <>
            <Text style={{ textAlign: 'center' }} size="LARGE">
              선물 생성에 실패했습니다
            </Text>

            <Text style={{ textAlign: 'center', marginTop: '5%' }} size="LARGE">
              다시 생성해 주세요!
            </Text>

            <Div>
              <Image src="/giftfail.png"></Image>
            </Div>
          </>
        )}
      </EventCompleteContainer>
    </>
  )
}

const EventCompleteContainer = styled.div`
  height: calc(100% - 92px);
  width: calc(100% - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`
const Div = styled.div`
  margin-top: 10%;
`
const DisplayStyle = styled.div`
  ${({ copyMessage }: Message) => {
    return copyMessage
      ? css`
          display: black;
        `
      : css`
          visibility: hidden;
        `
  }}
`

export default EventComplete
