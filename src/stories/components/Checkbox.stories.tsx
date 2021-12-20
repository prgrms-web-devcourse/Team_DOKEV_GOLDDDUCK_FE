import Checkbox from '@components/Checkbox'
import { FONT_SIZES } from '@utils/constants/sizes'

interface ICheckbox {
  key: string
  name: string
  size?: 'MICRO' | 'SMALL' | 'BASE' | 'MEDIUM' | 'LARGE'
  checked: boolean
  onClick: React.MouseEventHandler<HTMLInputElement>
}

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    name: {
      control: 'text',
    },
    size: {
      options: Object.keys(FONT_SIZES),
      control: 'select',
      defaultValue: 'BASE',
    },
    checked: {
      control: 'boolean',
      defaultValue: false,
    },
    key: {
      control: 'text',
    },
  },
}

export const Default = (args: ICheckbox) => {
  return (
    <div style={{ backgroundColor: 'black', padding: 20 }}>
      <Checkbox id={''} {...args} />
    </div>
  )
}
