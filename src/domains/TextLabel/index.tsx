import styled from '@emotion/styled'
import Text from '@components/Text'
interface Props {
  title: string
}

const TextLabel = ({ title }: Props) => {
  return (
    <>
      <LabelStyled htmlFor="participant">
        <Text style={{ display: 'inline-block' }} size="SMALL">
          {title}
        </Text>
        <Text style={{ color: 'red', display: 'inline-block' }} size="SMALL">
          *
        </Text>
      </LabelStyled>
    </>
  )
}

export default TextLabel

const LabelStyled = styled.label`
  width: 30%;
  white-space: nowrap;
`
