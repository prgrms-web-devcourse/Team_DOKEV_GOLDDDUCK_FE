import React from 'react'
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

const gifts = [
  { id: 1, giftTitle: '시원한 아이스 아메리카노', quantity: 10 },
  { id: 2, giftTitle: '리아 친필 싸인', quantity: 10 },
  { id: 3, giftTitle: '파트로 초코초코 파우더', quantity: 0 },
  { id: 4, giftTitle: '가가 맥주 세트', quantity: 0 },
  { id: 5, giftTitle: '문타리 사과', quantity: 10 },
  { id: 6, giftTitle: '스펜서 친필 싸인', quantity: 10 },
  { id: 7, giftTitle: '파트로 딸기딸기 파우더', quantity: 5 },
  { id: 8, giftTitle: '가가 소 세트', quantity: 3 },
  { id: 9, giftTitle: '시언한 아이스 아메리카노', quantity: 10 },
  { id: 10, giftTitle: '리아 친필 싸인', quantity: 10 },
  { id: 11, giftTitle: '파트로 나나바나나 파우더', quantity: 5 },
  { id: 12, giftTitle: '가가 양주 세트', quantity: 3 },
]

const EventPresent = () => {
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
              <PresentModal></PresentModal>
              <MUIButton style={{ backgroundColor: '#CE000B' }}>완료</MUIButton>
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
                id={id}
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
export default EventPresent
