import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import Text from '@components/Text'
import Modal from '@components/Modal'
import MUIButton from '@components/MUIButton'
import { IFilteredWinnerList, IFilteredWinner } from 'types/event'
import Image from '@components/Image'
import EMPTY_IMAGE from '/public/empty.png'

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

        <Contents>
          {winners.length ? (
            winners.map(({ category, winners }: IFilteredWinnerList, index) => {
              return (
                <StyledCategory key={index}>
                  <StyledTitle>
                    <Image
                      src={`/gifts/gift${
                        Math.floor(Math.random() * 8) + 1
                      }.png`}
                      width="30px"
                      height="30px"
                      mode="contain"
                      style={{ marginRight: 4 }}
                    />
                    <Text color="BLACK" size="MEDIUM">
                      {category}
                    </Text>
                  </StyledTitle>
                  <StyledList>
                    {winners.map(({ _id, name }: IFilteredWinner) => {
                      return (
                        <Text
                          color="WHITE"
                          size="BASE"
                          key={_id}
                          style={{ display: 'inline' }}>
                          {name}
                        </Text>
                      )
                    })}
                  </StyledList>
                </StyledCategory>
              )
            })
          ) : (
            <Image src={EMPTY_IMAGE.src} width="100%" height="100%" />
          )}
        </Contents>
      </Modal>
    </WinnerSection>
  )
}

const winnerBtnStyle: React.CSSProperties = {
  outline: `1px solid ${COLORS.TEXT_GRAY_LIGHT}`,
  border: 'none',
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
`

const Contents = styled.div`
  padding: 16px;
`

const StyledCategory = styled.div`
  border: 1px solid ${COLORS.TEXT_GRAY_DARK};
  border-radius: 4px;
  text-align: center;
  position: relative;
  margin: 32px 0;
`

const StyledTitle = styled.div`
  height: 40px;
  display: inline-flex;
  align-items: center;
  position: relative;
  top: -20px;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.TEXT_GRAY_DARK};
  border-radius: 20px;
  padding: 4px 16px 4px 8px;
  line-height: 15px;
  font-weight: bold;
`

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 16px 16px 16px;
  gap: 8px;
`

export default WinnerModal
