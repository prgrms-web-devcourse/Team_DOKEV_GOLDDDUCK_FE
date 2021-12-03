import { CSSProperties } from 'react'
import Icon from '@components/Icon'
import { ICON_TYPES } from '@utils/constants/icons'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'

interface IIcon {
  name: string
  size?: string
  color?: string
  style?: CSSProperties
  onIconClick?: React.MouseEventHandler<SVGElement>
}

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      options: Object.keys(ICON_TYPES),
      control: 'select',
      defaultValue: 'remove',
    },
    color: {
      options: Object.keys(COLORS),
      control: 'select',
      defaultValue: 'BLACK',
    },
    size: {
      options: Object.keys(FONT_SIZES),
      control: 'select',
      defaultValue: 'BASE',
    },
  },
}

export const Default = (args: IIcon) => {
  return <Icon {...args} />
}
