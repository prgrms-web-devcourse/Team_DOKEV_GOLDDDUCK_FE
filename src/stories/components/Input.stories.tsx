import { InputText, InputRadio } from '@components/Input'
import styled from '@emotion/styled'
import { useCallback, useState } from 'react'

export default {
  title: 'Components/Input',
  component: InputText,
}

export const TextInput = () => {
  const [value, setValue] = useState<string>('')

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value
      setValue(() => newValue)
    },
    [],
  )

  return (
    <Contaier>
      <Div>
        <LabelStyled htmlFor="input-text" style={{ color: '#FFFFFF' }}>
          제목*
        </LabelStyled>
        <InputText
          id="input-text"
          value={value}
          name={'textInput'}
          maxlength={15}
          onChange={handleOnChange}
        />
      </Div>
    </Contaier>
  )
}

export const RadioInput = () => {
  const [inputState, setInputState] = useState<string>('')

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newInputState = e.target.value
      if (inputState !== newInputState) {
        setInputState(() => newInputState)
      }
    },
    [],
  )

  return (
    <Div>
      <label htmlFor="radio-1">첫번째 버튼</label>
      <InputRadio
        id="radio-1"
        value="첫번째 버튼"
        name={'RadioGroup'}
        checked={inputState === '첫번째 버튼'}
        onChange={handleOnChange}
      />
      <label htmlFor="radio-2">두번째 버튼</label>
      <InputRadio
        id="radio-2"
        value="두번째 버튼"
        name={'RadioGroup'}
        checked={inputState === '두번째 버튼'}
        onChange={handleOnChange}
      />
      <label htmlFor="radio-3">인라인 스타일 적용</label>
      <InputRadio
        id="radio-3"
        value="세번째 버튼"
        name={'RadioGroup'}
        checked={inputState === '세번째 버튼'}
        onChange={handleOnChange}
        style={{ marginLeft: '32px' }}
      />
      <h1>{inputState ? inputState : 'No'}</h1>
    </Div>
  )
}

const Contaier = styled.div`
  width: 425px;
  height: 1080px;
  background-color: #000000;
`

const Div = styled.div`
  width: calc(100% - 32px);
  margin: 0 auto;
  display: flex;
`

const LabelStyled = styled.label`
  display: block;
  width: 30%;
  font-size: 1.5rem;
`
