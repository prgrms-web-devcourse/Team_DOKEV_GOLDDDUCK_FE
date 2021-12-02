import { InputText, InputRadio } from '@components/Input'
import styled from '@emotion/styled'
import { useCallback, useState } from 'react'

export default {
  title: 'Component/Input',
  component: InputText,
}

export const TextInput = () => {
  const [value, setValue] = useState<string>('')

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      console.log('handleOnChange')
      const newValue = e.target.value
      if (newValue.length < 15) {
        setValue(() => newValue)
      }
    },
    [],
  )

  return (
    <Contaier>
      <Div>
        <label
          htmlFor="input-text"
          style={{ color: '#FFFFFF', marginRight: '24px' }}>
          제목
        </label>
        <InputText
          id="input-text"
          width="65%"
          value={value}
          name={'textInput'}
          onChange={handleOnChange}
          style={{ marginTop: '24px' }}
        />
      </Div>
    </Contaier>
  )
}

export const RadioInput = () => {
  const [inputState, setInputState] = useState<string>('')

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      console.log('handleOnChange')
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
  width: calc(85% - 32px);
  margin: 0 auto;
`
