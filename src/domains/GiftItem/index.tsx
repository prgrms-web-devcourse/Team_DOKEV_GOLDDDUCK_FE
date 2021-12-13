import { GIFT_TYPE } from 'types/gift'
import Image from '@components/Image'
import Text from '@components/Text'
import { EVENT_TEMPLATE } from 'types/event'
import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'

interface IGiftItem {
  type: GIFT_TYPE
  imageStyle?: React.CSSProperties
  templateStyle?: React.CSSProperties
  textStyle?: React.CSSProperties
  imageSrc?: string
  template?: EVENT_TEMPLATE
  message?: string
}

const GiftItem = ({
  type,
  imageStyle,
  textStyle,
  imageSrc,
  template,
  message,
}: IGiftItem): JSX.Element => {
  return type === 'IMAGE' ? (
    <Image src={imageSrc as string} style={{ ...imageStyle }} />
  ) : (
    <Text
      size="MEDIUM"
      color="BLACK"
      style={{
        backgroundImage: `url(/templates/${template}.png)`,
        ...messageStyle,
        ...textStyle,
      }}>
      {message}
    </Text>
  )
}

const messageStyle: React.CSSProperties = {
  height: '65vh',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  wordBreak: 'keep-all',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 25,
  padding: 30,
  lineHeight: 1.7,
  textAlign: 'center',
}

export default GiftItem
