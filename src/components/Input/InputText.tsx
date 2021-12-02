import styled from '@emotion/styled'

interface IInputText {
  value: string | number
  id: string
  name: string
  width: string
  height?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  style?: React.CSSProperties
}

const InputText = ({
  value,
  id,
  name,
  width,
  height = '32px',
  onChange,
  style,
}: IInputText): JSX.Element => {
  const inputStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  }

  return (
    <InputStyled
      id={id}
      type="text"
      value={value}
      name={name}
      onChange={onChange}
      style={{ ...inputStyle }}
    />
  )
}

const InputStyled = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #bebebe; // TEXT_GRAY_LIGHT
  background: none;
  color: #ffffff; // WHITE
  font-weight: bold;
  font-size: 1.125rem;
`

export default InputText
