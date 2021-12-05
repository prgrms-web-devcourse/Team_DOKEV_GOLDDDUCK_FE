import { CSSProperties } from 'react'
import { FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'
import { style } from '@mui/system'

interface Props {
  size: 'MICRO' | 'SMALL' | 'BASE' | 'MEDIUM' | 'LARGE'
  color: 'WHITE' | 'BLACK' | 'TEXT_GRAY_LIGHT' | 'TEXT_GRAY_DARK' | 'TEXT_BLACK'
  style?: CSSProperties
}

const Text: React.FC<Props> = ({ size, color, children }) => {
  const { [size]: fontSize } = FONT_SIZES
  const { [color]: fontColor } = COLORS

  return <div style={{ fontSize, color: fontColor, ...style }}>{children}</div>
}

export default Text