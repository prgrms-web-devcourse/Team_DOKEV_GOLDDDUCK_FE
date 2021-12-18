import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import Text from '@components/Text'
import Modal from '@components/Modal'
import MUIButton from '@components/MUIButton'
import { IFilteredWinners } from 'types/event'

interface IWinnerModal {
  winners: IFilteredWinners[] | []
  isClosed: boolean
}

const WinnerModal = ({ winners, isClosed }: IWinnerModal): JSX.Element => {
  console.log(winners)

  return (
    <WinnerSection>
      <Modal title="당첨자 목록" btnStyle={{ ...winnerBtnStyle }}>
        <MUIButton
          style={{
            backgroundColor: isClosed ? COLORS.GREEN : COLORS.TEXT_GRAY_DARK,
            ...winnerBtnStyle,
          }}>
          당첨자 목록 보기
        </MUIButton>
        <>
          {isClosed ? (
            winners?.map(({ category, winners }: IFilteredWinners, index) => {
              return (
                <section key={index}>
                  <Text color="WHITE" size="MEDIUM">
                    {category}
                  </Text>
                  <Text color="WHITE" size="BASE">
                    {winners._id}
                    {winners.name}
                  </Text>
                </section>
              )
            })
          ) : (
            <Text color="WHITE" size="BASE">
              이벤트가 종료되면 당첨자 목록을 확인할 수 있어요!
            </Text>
          )}
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
