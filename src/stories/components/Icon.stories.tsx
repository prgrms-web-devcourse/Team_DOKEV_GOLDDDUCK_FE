import React from 'react'
import Icon from '@components/Icon'
import { ICON_TYPES } from '../../utils/constants/icons'
import { COLORS } from '../../utils/constants/colors'
import { FONT_SIZES } from '../../utils/constants/sizes'

export default {
  title: 'Component/Icon',
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
      defaultValue: 'black',
    },
    size: {
      options: Object.keys(FONT_SIZES),
      control: 'select',
      defaultValue: 'black',
    },
  },
}

export const Default = (args: any) => {
  return <Icon {...args} />
}
