import Image from '@components/Image'

export default {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    width: {
      defaultValue: 180,
      control: { type: 'number' },
    },
    height: {
      defaultValue: 240,
      control: { type: 'number' },
    },
    mode: {
      defaultValue: 'contain',
      options: ['cover', 'fill', 'contain'],
      control: { type: 'inline-radio' },
    },
    block: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    threshold: {
      defaultValue: 0.9,
      control: { type: 'number' },
    },
    iscircle: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
}

export const Default = (args: any) => {
  return (
    <>
      <Image src="https://picsum.photos/200" block={true} {...args} />
      <Image src="https://picsum.photos/200" block={true} {...args} />
      <Image src="https://picsum.photos/200" block={true} {...args} />
      <Image
        src="https://picsum.photos/200"
        block={true}
        style={{ marginLeft: '24px' }}
        {...args}
      />
    </>
  )
}
