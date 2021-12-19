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
import { COLORS } from '@utils/constants/colors'

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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: 60,
            height: '100%',
          }}>
          <Icon
            name="gift"
            color="RED"
            size="LARGE"
            style={{ cursor: 'auto' }}
          />
          <Text
            size="SMALL"
            style={{ letterSpacing: '0.1em', lineHeight: '18px' }}>
            {totalQuantity}개
          </Text>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: `${DEFAULT_MARGIN} 0`,
          }}>
          <Modal title="선물 등록" handleStateClear={handleStateClear} confirm>
            <ItemForm>
              <Icon name="plus" color="WHITE" size="LARGE" />
            </ItemForm>
            <PresentModal
              category={category}
              content={content}
              contentList={contentList}
              useRefCheck={useRefCheck}
              handleInput={handleInput}
              onCilckMessage={onCilckMessage}
              hadleImageUpload={hadleImageUpload}></PresentModal>
            <MUIButton style={{ backgroundColor: '#CE000B' }} onClick={AddGift}>
              완료
            </MUIButton>
          </Modal>

          <Text size="MEDIUM" color="WHITE" style={{ paddingLeft: '8px' }}>
            선물 추가하기
          </Text>
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
          <Image
            src={noting.src}
            width="50px"
            height="50px"
            style={{ margin: '0 10px' }}
          />
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
          <Text
            size="MICRO"
            style={{
              color: '#CE000B',
              whiteSpace: 'nowrap',
              alignSelf: 'flex-start',
              marginLeft: 'auto',
            }}>
            * 등록한 선물이 부족하면 꽝으로 채워집니다.
          </Text>
        </DisplayStyle>
      </EventPresentContainer>
    </>
  )
}

const EventPresentContainer = styled.div`
  padding: 40px ${DEFAULT_MARGIN} 0 ${DEFAULT_MARGIN};
`
const GiftWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  height: calc(100vh - 288px);
  position: relative;
  padding-bottom: 80px;
  /* @media all and (max-width: 425px) {
    height: 50vh;
  }
  @media all and (max-width: 320px) {
    height: 45vh;
  } */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
const ItemForm = styled.div`
  display: flex;
  border: 1px dashed white;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`

const DisplayStyle = styled.div`
  width: 100%;
  background-color: ${COLORS.BLACK};
  position: relative;
  padding-top: 8px;
  bottom: 56px;
  left: 0;
  ${({ giftChoiceType }: Display) => {
    return giftChoiceType === 'RANDOM'
      ? css`
          display: flex;
          align-items: center;
        `
      : css`
          display: none;
        `
  }}
`

export default EventPresent
