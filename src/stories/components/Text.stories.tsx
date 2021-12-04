import Text from '@components/Text'
import { CSSProperties } from 'react'

interface Props {
  size: 'MICRO' | 'SMALL' | 'BASE' | 'MEDIUM' | 'LARGE'
  color: 'WHITE' | 'BLACK' | 'TEXT_GRAY_LIGHT' | 'TEXT_GRAY_DARK' | 'TEXT_BLACK'
  style?: CSSProperties
}

export default {
  title: 'Components/Text',
  component: Text,
}

export const Default = (args: Props) => {
  return <Text {...args}>안녕하세요 Text 컴포넌트 입니다</Text>
}
