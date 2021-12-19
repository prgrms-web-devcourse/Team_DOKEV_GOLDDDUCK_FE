import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import Text from '@components/Text'
import Modal from '@components/Modal'
import MUIButton from '@components/MUIButton'
import { IFilteredWinnerList, IFilteredWinner } from 'types/event'

interface IWinnerModal {
  winners: IFilteredWinnerList[] | []
}

const WinnerModal = ({ winners }: IWinnerModal): JSX.Element => {
  return (
    <WinnerSection>
      <Modal title="당첨자 목록" btnStyle={{ ...winnerBtnStyle }}>
        <MUIButton
          style={{
            backgroundColor: COLORS.GREEN,
            ...winnerBtnStyle,
          }}>
          당첨자 목록 보기
        </MUIButton>

        <>
          {winners?.map(({ category, winners }: IFilteredWinnerList, index) => {
            return (
              <section key={index}>
                <Text color="WHITE" size="MEDIUM">
                  {category}
                </Text>
                {winners.map(({ _id, name }: IFilteredWinner) => {
                  return (
                    <Text color="WHITE" size="BASE">
                      {_id}
                      {name}
                    </Text>
                  )
                })}
              </section>
            )
          })}
        </>
      </Modal>
    </WinnerSection>
  )
}

const winnerBtnStyle: React.CSSProperties = {
  border: 'none',
  outline: `1px solid ${COLORS.WHITE}`,
  borderRadius: 20,
  lineHeight: 2,
  cursor: 'pointer',
  width: 240,
  color: COLORS.WHITE,
}

const WinnerSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 72px;
`

export default WinnerModal
