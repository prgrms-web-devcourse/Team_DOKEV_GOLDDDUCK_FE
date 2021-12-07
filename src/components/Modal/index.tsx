import Icon from '@components/Icon'
import Text from '@components/Text'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { COLORS } from '@utils/constants/colors'

interface IModal {
  title?: string
  confirm?: boolean
}

interface IProps {
  open: boolean
}

const Modal: React.FC<IModal> = ({ children, title = '', confirm = false }) => {
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
  }

  return (
    <>
      <div onClick={handleClickOpen}>{React.Children.toArray(children)[0]}</div>
      <StyledModal open={open}>
        <ModalHeader>
          <Text color="WHITE" size="BASE">
            {title}
          </Text>
          <Icon
            name={'close'}
            style={{ position: 'absolute', top: '16px', right: '16px' }}
            onIconClick={handleClose}
          />
        </ModalHeader>
        <ModalContent>
          {React.Children.toArray(children)[1]}
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
  display: ${({ open }: IProps) => (open ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background-color: ${COLORS.BLACK};
  /* transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1); //transition 시도 중.. */
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 16px;
  box-sizing: border-box;
  color: ${COLORS.WHITE};
`

const ModalContent = styled.div`
  height: calc(100% - 48px);
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const ModalBottom = styled.div`
  width: 100%;
  text-align: center;
`

export default Modal
