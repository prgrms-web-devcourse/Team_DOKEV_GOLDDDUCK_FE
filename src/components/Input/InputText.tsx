import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'

interface IInputText {
  value: string | number
  id: string
  name: string
  maxlength?: number
  style?: React.CSSProperties
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText = ({
  value,
  id,
  name,
  onChange,
  style,
  maxlength = 15,
}: IInputText): JSX.Element => {
  return (
    <InputStyled
      id={id}
      type="text"
      value={value}
      name={name}
      onChange={onChange}
      maxLength={maxlength}
      style={{ ...style }}
    />
  )
}

const InputStyled = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${COLORS.TEXT_GRAY_LIGHT};
  background: none;
  color: ${COLORS.WHITE};
  font-weight: bold;
  font-size: ${FONT_SIZES.MEDIUM};
  height: 32px;
  width: 70%;
`

export default InputText
