import React from 'react'
import styled from '@emotion/styled'
import Image from '@components/Image'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Text from '@components/Text'
import Icon from '@components/Icon'

interface Props {
  giftCheckId: string
  index: number
  length: number
  category: string
  deleteGiftItem(e: string): void
}

const GiftForm = ({
  giftCheckId,
  index,
  category,
  length,
  deleteGiftItem,
}: Props) => {
  return (
    <>
      <Gift key={giftCheckId}>
        <Image
          src={`/gifts/gift${(index % 8) + 1}.png`}
          width="60px"
          height="60px"
          mode="contain"
        />
        <GiftTextWrapper>
          <Text size="BASE" color="WHITE">
            {category}
          </Text>
          <Text size="MICRO" color="TEXT_GRAY_DARK" style={{ paddingTop: 6 }}>
            {`수량 : ${length}개`}
          </Text>
        </GiftTextWrapper>
        <Icon
          name="close"
          color="TEXT_GRAY_DARK"
          size="LARGE"
          onIconClick={() => deleteGiftItem(giftCheckId)}></Icon>
      </Gift>
    </>
  )
}

const Gift = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: ${DEFAULT_MARGIN} 0;
`

const GiftTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
`

export default GiftForm
