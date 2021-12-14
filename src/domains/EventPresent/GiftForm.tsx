import React from 'react'
import styled from '@emotion/styled'
import Image from '@components/Image'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Text from '@components/Text'
import Icon from '@components/Icon'

interface Props {
  id: string
  index: number
  length: number
  category: string
  delteGiftItem(e: string): void
}

const GiftForm = ({ id, index, category, length, delteGiftItem }: Props) => {
  return (
    <>
      <Gift key={id}>
        <Image
          src={`/cover/cover${(index % 6) + 1}.png`}
          width="60px"
          height="60px"
          mode="contain"
        />
        <GiftTextWrapper>
          <Text size="MEDIUM" color="WHITE">
            {category}
          </Text>
          <Text
            size="BASE"
            color="TEXT_GRAY_DARK"
            style={{ paddingTop: '3px' }}>
            {`수량 : ${length}개`}
          </Text>
        </GiftTextWrapper>
        <Icon
          name="close"
          color="TEXT_GRAY_DARK"
          size="LARGE"
          onIconClick={() => delteGiftItem(id)}></Icon>
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
