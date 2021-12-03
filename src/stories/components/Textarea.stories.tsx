import Textarea from '@components/Textarea'
import styled from '@emotion/styled'
import { useState } from 'react'

export default {
  title: 'Components/Textarea',
  component: Textarea,
}

export const Default = () => {
  const [value, setValue] = useState<string>('')

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value
    setValue(() => newValue)
  }

  return (
    <Container>
      <div>''</div>
      <TextareaWrapper>
        <LabelStyled htmlFor="textarea">메시지</LabelStyled>
        <Textarea
          id="textarea"
          name="text-area"
          value={value}
          onChange={handleOnChange}
        />
      </TextareaWrapper>
      <div
        style={{
          color: 'white',
          fontSize: '1.8rem',
        }}>
        {value ? value : 'No Value'}
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 425px;
  height: 1080px;
  background-color: #000000;
  box-sizing: border-box;
`

const TextareaWrapper = styled.div`
  width: 98%;
  margin: 0 auto;
  margin-top: 16px;
  background-color: #ffffff;
`

const LabelStyled = styled.label`
  font-size: 1.8rem;
  width: 100%;
  text-align: center;
  display: inline-block;
`
