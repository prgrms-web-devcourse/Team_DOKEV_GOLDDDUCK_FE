import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import Text from '@components/Text'
import Icon from '@components/Icon'
import Modal from '@components/Modal'
import MUIButton from '@components/MUIButton'
import { IFilteredWinners } from 'types/event'
import { useCallback } from 'react'

interface IWinnerModal {
  winners: IFilteredWinners[]
  isClosed: boolean
  onClick: () => void
}

const WinnerModal = ({
  winners,
  isClosed,
  onClick,
}: IWinnerModal): JSX.Element => {
  const handleClick = useCallback(() => {
    isClosed && onClick?.()
  }, [onClick])

  return (
    <WinnerSection>
      <Text>당첨자 확인</Text>
      <Icon name="pointDown" size="MEDIUM" />
      <Modal title="당첨자 목록" btnStyle={{ ...winnerBtnStyle }}>
        <MUIButton style={{ ...winnerBtnStyle }} onClick={handleClick}>
          클릭
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
