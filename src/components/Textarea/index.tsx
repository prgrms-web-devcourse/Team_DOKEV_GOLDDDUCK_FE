import styled from '@emotion/styled'
import React from 'react'

interface ITextarea {
  id: string
  name: string
  value: string
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
}

const Textarea = ({ id, name, value, onChange }: ITextarea): JSX.Element => {
  return (
    <TextareaStyled
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder="메시지를 입력해주세요!"
      maxLength={150}
      autoCapitalize="off"
    />
  )
}

const TextareaStyled = styled.textarea`
  background-color: #ffffff;
  box-sizing: border-box; /* 삭제할것 스토리북 전용 */
  border: none;
  border-top: 2px solid #ce000b;
  padding: 8px;
  width: 98%;
  height: 190px;
  resize: none;
  outline: none;
  margin: 0 auto;
  display: block;
  font-size: 1.5rem;
  white-space: break-spaces;
  line-height: 1.3;
  letter-spacing: 1px;
`

export default Textarea
