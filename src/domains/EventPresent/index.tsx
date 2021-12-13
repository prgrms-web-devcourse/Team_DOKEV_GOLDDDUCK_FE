import React, { useState } from 'react'
import styled from '@emotion/styled'
import Image from '@components/Image'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import Text from '@components/Text'
import Icon from '@components/Icon'
import noting from '/public/nothing.png'
import Modal from '@components/Modal'
import MUIButton from '@components/MUIButton'
import PresentModal from './PresentModal'
import GiftForm from './GiftForm'

interface Gift {
  id: number
  giftTitle: string
  quantity: number
}

interface Props {
  gifts: Gift[]
}

const EventPresent = ({ gifts }: Props) => {
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [contentList, setContentList] = useState<string[]>([])
  const [image, setImage] = useState<File[] | null>()

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.name === 'category'
      ? setCategory(e.target.value)
      : setContent(e.target.value)
  }

  const onCilckMessage = () => {
    setContentList([...contentList, content])
    setContent('')
  }

  const hadleImageUpload = (fileList: File[]) => {
    setImage(fileList)
  }

  const onSubmit = () => {
    console.log(category)
    console.log(contentList)
    console.log(image)
  }

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
            <Text size="MICRO">{gifts.length}개</Text>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '10px',
            }}>
            <Modal title="선물 등록" confirm>
              <div
                style={{
                  display: 'flex',
                  border: '1px dashed white',
                  width: '50px',
                  height: '50px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="plus" color="WHITE" size="LARGE"></Icon>
              </div>
              <PresentModal
                category={category}
                content={content}
                contentList={contentList}
                handleInput={handleInput}
                onCilckMessage={onCilckMessage}
                hadleImageUpload={hadleImageUpload}></PresentModal>
              <MUIButton
                style={{ backgroundColor: '#CE000B' }}
                onClick={onSubmit}>
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
            gifts.map(({ id, giftTitle, quantity }, index) => (
              <GiftForm
                key={id}
                index={index}
                giftTitle={giftTitle}
                quantity={quantity}></GiftForm>
            ))}
        </GiftWrapper>

        <div
          style={{
            padding: '10px 0 0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image src={noting.src} width="60px" height="60px" />
          <div>
            <Text size="MEDIUM" color="WHITE">
              꽝!
            </Text>
            <Text
              size="BASE"
              color="TEXT_GRAY_DARK"
              style={{ paddingTop: '3px' }}>
              수량 : 10 개
            </Text>
          </div>
          <div>
            <Text size="MICRO" style={{ color: '#CE000B' }}>
              * 등록한 선물이 부족하면 꽝으로 채워집니다.
            </Text>
          </div>
        </div>
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
  height: 55vh;
  @media all and (max-width: 425px) {
    height: 55vh;
  }
  @media all and (max-width: 320px) {
    height: 50vh;
  }
  padding-left: ${DEFAULT_MARGIN};
  padding-right: ${DEFAULT_MARGIN};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
// const gifts = [
//   {
//     category: '아메리카노',
//     giftItems: [
//       {
//         content: ['아메리카노~', '아메리카노2'],
//         image: ['금나와라 뚝딱', '의자', '명함'],
//       },
//     ],
//   },
// ]

export default EventPresent
