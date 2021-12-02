import Image from '@components/Image'

interface IImage {
  style?: React.CSSProperties
  display?: string
  iscircle?: boolean
  mode?: 'fill' | 'contain' | 'cover'
  width?: number | string
  height?: number | string
  lazy?: boolean
  threshold?: number
  placeholder?: string
}

export default {
  title: 'Components/Image',
  component: Image,
}

export const Default = (args: IImage) => {
  return (
    <>
      <Image src="https://picsum.photos/200" display="block" {...args} />
      <Image src="https://picsum.photos/200" display="block" {...args} />
      <Image src="https://picsum.photos/200" display="block" {...args} />
      <Image
        src="https://picsum.photos/200"
        display="block"
        style={{ marginLeft: '24px' }}
        {...args}
      />
    </>
  )
}
