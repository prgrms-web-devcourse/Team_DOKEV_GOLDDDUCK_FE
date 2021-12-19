import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Image from '@components/Image'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Text from '@components/Text'
import Icon from '@components/Icon'
import noting from '/public/nothing.png'
import Modal from '@components/Modal'
import MUIButton from '@components/MUIButton'
import PresentModal from './PresentModal'
import GiftForm from './GiftForm'
import { ErrorAlert } from '@components/Swalert'

interface Display {
  giftChoiceType: string
}

interface Props {
  gifts: Gift[]
  AddGiftItem(e: Gift): void
  delteGiftItem(e: string): void
  maxParticipantCount: number | undefined
  giftChoiceType: string
}

interface Gift {
  giftCheckId: string
  category: string
  giftItems: GiftItem[]
}

interface GiftItem {
  content?: string
  image?: File
  giftType: 'TEXT' | 'IMAGE'
}

const EventPresent = ({
  gifts,
  AddGiftItem,
  delteGiftItem,
  maxParticipantCount = 0,
  giftChoiceType,
}: Props) => {
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [contentList, setContentList] = useState<GiftItem[]>([])
  const [image, setImage] = useState<GiftItem[]>([])
  const [useRefCheck, setUseRefCheck] = useState(false)

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.name === 'category'
      ? setCategory(e.target.value)
      : setContent(e.target.value)
  }

  const onCilckMessage = () => {
    if (content.length > 0) {
      setContentList([...contentList, { content, giftType: 'TEXT' }])
      setContent('')
    }
  }

  const hadleImageUpload = (fileList: File[]) => {
    setImage([])
    fileList.map((file) =>
      setImage((imageList) => [
        ...imageList,
        { image: file, giftType: 'IMAGE' },
      ]),
    )
  }

  const AddGift = () => {
    if (
      maxParticipantCount <
      totalQuantity + image.length + contentList.length
    ) {
      ErrorAlert('참여인원보다 선물이 많습니다.!')

      return false
    }

    if (category && (image.length > 0 || contentList.length > 0)) {
      const giftItems = {
        giftCheckId: uuidv4(),
        category,
        giftItems: [...image, ...contentList],
      }
      AddGiftItem(giftItems)
    } else {
      ErrorAlert('선물 이름과 이미지 or 메시지를 입력하세요!')

      return false
    }
  }

  const handleStateClear = () => {
    setCategory('')
    setContent('')
    setImage([])
    setUseRefCheck((state) => !state)
    setContentList([])
  }

  const totalQuantity = gifts.reduce((acc, { giftItems }) => {
    return acc + giftItems.length
  }, 0)

  return (
    <>
      <EventPresentContainer>
        <div style={{ padding: '0 0 8px 15px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Icon
              name="gift"
              color="RED"
              size="LARGE"
              style={{ cursor: 'auto' }}></Icon>
            <Text size="MICRO">{totalQuantity}개</Text>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '10px',
            }}>
            <Modal
              title="선물 등록"
              handleStateClear={handleStateClear}
              confirm>
              <ItemForm>
                <Icon name="plus" color="WHITE" size="LARGE"></Icon>
              </ItemForm>

              <PresentModal
                category={category}
                content={content}
                contentList={contentList}
                useRefCheck={useRefCheck}
                handleInput={handleInput}
                onCilckMessage={onCilckMessage}
                hadleImageUpload={hadleImageUpload}></PresentModal>
              <MUIButton
                style={{ backgroundColor: '#CE000B' }}
                onClick={AddGift}>
                완료
              </MUIButton>
            </Modal>

            <Text size="MEDIUM" color="WHITE" style={{ paddingLeft: '8px' }}>
              선물 추가하기
            </Text>
          </div>
        </div>

        <GiftWrapper>
          {gifts &&
            gifts.map(({ giftCheckId, category, giftItems }, index) => {
              return (
                <GiftForm
                  key={giftCheckId}
                  giftCheckId={giftCheckId}
                  index={index}
                  category={category}
                  length={giftItems.length}
                  delteGiftItem={delteGiftItem}></GiftForm>
              )
            })}
        </GiftWrapper>

        <DisplayStyle giftChoiceType={giftChoiceType}>
          <Image src={noting.src} width="60px" height="60px" />
          <div>
            <Text size="MEDIUM" color="WHITE">
              꽝!
            </Text>
            <Text
              size="BASE"
              color="TEXT_GRAY_DARK"
              style={{ paddingTop: '3px' }}>
              수량 : {maxParticipantCount - totalQuantity} 개
            </Text>
          </div>
          <div>
            <Text size="MICRO" style={{ color: '#CE000B' }}>
              * 등록한 선물이 부족하면 꽝으로 채워집니다.
            </Text>
          </div>
        </DisplayStyle>
      </EventPresentContainer>
    </>
  )
}

const EventPresentContainer = styled.div`
  margin-top: 10%;
`
const GiftWrapper = styled.div`
  width: 100%;
  overflow: auto;
  height: 50vh;
  @media all and (max-width: 425px) {
    height: 50vh;
  }
  @media all and (max-width: 320px) {
    height: 45vh;
  }
  padding-left: ${DEFAULT_MARGIN};
  padding-right: ${DEFAULT_MARGIN};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
const ItemForm = styled.div`
  display: flex;
  border: 1px dashed white;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`

const DisplayStyle = styled.div`
  ${({ giftChoiceType }: Display) => {
    return giftChoiceType === 'RANDOM'
      ? css`
          display: black;
          padding: 10px 0 0 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `
      : css`
          visibility: hidden;
        `
  }}
`

export default EventPresent
