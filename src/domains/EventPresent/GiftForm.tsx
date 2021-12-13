import React from 'react'
import styled from '@emotion/styled'
import Image from '@components/Image'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Text from '@components/Text'
import Icon from '@components/Icon'

interface Props {
  index: number
  giftTitle: string
  quantity: number
}

const GiftForm = ({ giftTitle, quantity, index }: Props) => {
  return (
    <>
      <Gift key={index}>
        <Image
          src={`/cover/cover${(index % 6) + 1}.png`}
          width="60px"
          height="60px"
          mode="contain"
        />
        <GiftTextWrapper>
          <Text size="MEDIUM" color="WHITE">
            {giftTitle}
          </Text>
          <Text
            size="BASE"
            color="TEXT_GRAY_DARK"
            style={{ paddingTop: '3px' }}>
            수량 : {quantity}개
          </Text>
        </GiftTextWrapper>
        <Icon name="close" color="TEXT_GRAY_DARK" size="LARGE"></Icon>
      </Gift>
    </>
  )
}

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

export default GiftForm
