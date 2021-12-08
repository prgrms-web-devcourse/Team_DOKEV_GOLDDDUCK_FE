import styled from '@emotion/styled'
import Text from '@components/Text'
interface Props {
  title: string
}

const TextLabel = ({ title }: Props) => {
  return (
    <>
      <LabelStyled htmlFor="participant">
        <Text style={{ display: 'inline-block' }}>{title}</Text>
        <Text style={{ color: 'red', display: 'inline-block' }}>*</Text>
      </LabelStyled>
    </>
  )
}

export default TextLabel

const LabelStyled = styled.label`
  display: block;
  width: 30%;
  font-size: 1.5rem;
`
