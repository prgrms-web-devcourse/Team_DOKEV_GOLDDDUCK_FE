import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import Text from '@components/Text'
import Icon from '@components/Icon'
import Modal from '@components/Modal'
import MUIButton from '@components/MUIButton'

const WINNER_MOCK = {
  data: [
    {
      category: '시원한 아이스아메리카노',
      users: [
        {
          id: 1,
          name: '파트로',
          email: 'adsf@email.com',
        },
        {
          id: 2,
          name: '문타리',
          email: 'adsf@email.com',
        },
      ],
    },
    {
      category: '리아 친필사인',
      members: [
        {
          id: 3,
          name: '도가가',
          email: 'adsf@email.com',
        },
        {
          id: 4,
          name: '윤쏘닉',
          email: 'adsf@email.com',
        },
        {
          id: 5,
          name: '조이',
          email: 'adsf@email.com',
        },
      ],
    },
    {
      category: '기팍팍 응원메세지',
      members: [
        {
          id: 3,
          name: '도가가',
          email: 'adsf@email.com',
        },
        {
          id: 6,
          name: '맹귄',
          email: 'adsf@email.com',
        },
        {
          id: 2,
          name: '문타리',
          email: 'adsf@email.com',
        },
        {
          id: 7,
          name: '로니',
          email: 'adsf@email.com',
        },
        {
          id: 8,
          name: '라엘',
          email: 'adsf@email.com',
        },
        {
          id: 9,
          name: '리아',
          email: 'adsf@email.com',
        },
        {
          id: 10,
          name: '스펜서',
          email: 'adsf@email.com',
        },
      ],
    },
  ],
}

const WinnerModal = () => {
  return (
    <WinnerSection>
      <Text>당첨자 확인</Text>
      <Icon name="pointDown" size="MEDIUM" />
      <Modal title="당첨자 목록" btnStyle={{ ...winnerBtnStyle }}>
        <MUIButton style={{ ...winnerBtnStyle }}>클릭</MUIButton>
        <Text>당첨자 확인</Text>
      </Modal>
    </WinnerSection>
  )
}

const winnerBtnStyle: React.CSSProperties = {
  backgroundColor: COLORS.GREEN,
  borderRadius: 20,
  lineHeight: 2,
  cursor: 'pointer',
}

const WinnerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  background-color: inherit;
  margin-top: 30px;
`

export default WinnerModal
