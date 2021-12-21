import Icon from '@components/Icon'
import Text from '@components/Text'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { COLORS } from '@utils/constants/colors'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'

interface IModal {
  title?: string
  confirm?: boolean
  btnStyle?: React.CSSProperties
  handleStateClear?(): void
}

interface IProps {
  open: boolean
}

const Modal: React.FC<IModal> = ({
  children,
  title = '',
  confirm = false,
  btnStyle,
  handleStateClear,
}) => {
  const childrenCount = React.Children.count(children)
  if (childrenCount < 2) {
    return null
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    handleStateClear?.()
  }

  return (
    <>
      <div style={{ ...btnStyle }} onClick={handleClickOpen}>
        {React.Children.toArray(children)[0]}
      </div>
      <StyledModal open={open}>
        <ModalHeader
          style={{ display: open ? 'flex' : 'none', userSelect: 'none' }}>
          <Text color="WHITE" size="BASE" style={{ marginRight: 'auto' }}>
            {title}
          </Text>
          <Icon name="close" onIconClick={handleClose} />
        </ModalHeader>
        <ModalContent style={{ display: open ? 'flex' : 'none' }}>
          <Wrapper>{React.Children.toArray(children)[1]}</Wrapper>
          {confirm && (
            <ModalBottom onClick={handleClose}>
              {React.Children.toArray(children)[2]}
            </ModalBottom>
          )}
        </ModalContent>
      </StyledModal>
    </>
  )
}

const StyledModal = styled.div`
  position: absolute;
  top: ${({ open }: IProps) => (open ? 0 : '100%')};
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ open }: IProps) => (open ? '100%' : 0)};
  background-color: ${COLORS.BLACK};
  z-index: 1000;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
`

const ModalHeader = styled.div`
  flex-direction: flex-end;
  align-items: center;
  padding: 16px;
  color: ${COLORS.WHITE};
  border-bottom: 1px solid ${COLORS.TEXT_GRAY_DARK};
`

const Wrapper = styled.div`
  height: calc(100vh - 105px);
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const ModalContent = styled.div`
  height: calc(100vh - 49px);
  padding: 0 ${DEFAULT_MARGIN} ${DEFAULT_MARGIN} ${DEFAULT_MARGIN};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: inherit;
`

const ModalBottom = styled.div`
  width: 100%;
  margin-top: ${DEFAULT_MARGIN};
  text-align: center;
`

export default Modal
