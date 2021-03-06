import { CSSProperties } from 'react'
import { FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'

interface Props {
  size?: 'MICRO' | 'SMALL' | 'BASE' | 'MEDIUM' | 'LARGE'
  color?:
    | 'WHITE'
    | 'BLACK'
    | 'TEXT_GRAY_LIGHT'
    | 'TEXT_GRAY_DARK'
    | 'TEXT_BLACK'
  id?: string
  style?: CSSProperties
}

const Text: React.FC<Props> = ({
  size = 'BASE',
  color = 'WHITE',
  style,
  id,
  children,
}) => {
  const { [size]: fontSize } = FONT_SIZES
  const { [color]: fontColor } = COLORS

  return (
    <div
      id={id}
      style={{
        fontSize,
        color: fontColor,
        fontFamily: 'GmarketSansLight',
        ...style,
      }}>
      {children}
    </div>
  )
}

export default Text
