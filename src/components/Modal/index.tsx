import Icon from '@components/Icon'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
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
  if (React.Children.count(children) < 2) {
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
      <div onClick={handleClickOpen}>
        {React.Children.count(children) > 1 &&
          React.Children.toArray(children)[0]}
      </div>
      <StyledModal open={open}>
        <ModalHeader>
          {title} {/*Text 컴포넌트 적용 예정 */}
          <Icon
            name={'close'}
            style={{ position: 'absolute', top: '16px', right: '16px' }}
            onIconClick={handleClose}
          />
        </ModalHeader>
        <ModalContent>
          {React.Children.count(children) > 1 &&
            React.Children.toArray(children)[1]}
          {confirm && (
            <ModalBottom onClick={handleClose}>
              {React.Children.count(children) === 3 &&
                React.Children.toArray(children)[2]}
            </ModalBottom>
          )}
        </ModalContent>
      </StyledModal>
    </>
  )
}

const StyledModal = styled.div`
  ${({ open }: IProps) => {
    return open
      ? css`
          display: block;
        `
      : css`
          display: none;
        `
  }}
  position: fixed;
  top: 0;
  width: 425px;
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
`

const ModalBottom = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${COLORS.BLACK};
`

export default Modal
