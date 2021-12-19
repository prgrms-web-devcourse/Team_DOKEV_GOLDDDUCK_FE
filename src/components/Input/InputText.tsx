import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'

interface IInputText {
  value?: string | number
  id: string
  name: string
  maxlength?: number
  autoFocus?: boolean
  style?: React.CSSProperties
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText = ({
  value,
  id,
  name,
  onChange,
  style,
  placeholder,
  maxlength = 15,
  autoFocus,
}: IInputText): JSX.Element => {
  return (
    <InputStyled
      id={id}
      type="text"
      value={value}
      name={name}
      onChange={onChange}
      maxLength={maxlength}
      placeholder={placeholder}
      autoFocus={autoFocus ? true : false}
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
  font-size: ${FONT_SIZES.BASE};
  height: 32px;
  width: 70%;
  ::placeholder {
    font-size: ${FONT_SIZES.MICRO};
    color: ${COLORS.TEXT_GRAY_DARK};
  }
`

export default InputText
