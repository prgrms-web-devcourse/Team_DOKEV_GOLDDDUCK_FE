import styled from '@emotion/styled'
import React from 'react'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'

interface ITextarea {
  id: string
  name: string
  value: string
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
  style?: React.CSSProperties
}

const Textarea = ({
  id,
  name,
  value,
  onChange,
  style,
}: ITextarea): JSX.Element => {
  return (
    <TextareaStyled
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder="메시지를 입력해주세요!"
      maxLength={150}
      autoCapitalize="off"
      style={{ ...style }}
    />
  )
}

const TextareaStyled = styled.textarea`
  background-color: ${COLORS.WHITE};
  border: none;
  border-top: 2px solid ${COLORS.RED};
  padding: 8px;
  width: 98%;
  height: 190px;
  resize: none;
  outline: none;
  margin: 0 auto;
  display: block;
  font-size: ${FONT_SIZES.BASE};
  white-space: break-spaces;
  line-height: 1.3;
  letter-spacing: 1px;
`

export default Textarea
