import React, { CSSProperties } from 'react'
import Timer from '@components/Timer'

interface ITimer {
  time: Date
  size?: string
  color?: string
  style?: CSSProperties
}

export default {
  title: 'Component/Timer',
  component: Timer,
  argTypes: {
    time: {
      control: 'date',
    },
  },
}

export const Default = (args: ITimer) => {
  return <Timer {...args} />
}
