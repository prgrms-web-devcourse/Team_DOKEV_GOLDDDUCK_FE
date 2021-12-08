interface IImage {
  src: string
  style?: React.CSSProperties
  display?: string
  iscircle?: boolean
  mode?: 'fill' | 'contain' | 'cover'
  width?: number | string
  height?: number | string
  onClick?(e: React.MouseEvent<HTMLImageElement>): void
}

const Image = ({
  src,
  display = 'block',
  iscircle = false,
  mode = 'cover',
  width = 180,
  height = 240,
  onClick,
  style,
}: IImage): JSX.Element => {
  const imageStyle: React.CSSProperties = {
    display,
    objectFit: mode,
    borderRadius: iscircle ? '50%' : undefined,
    ...style,
  }

  return (
    <img
      src={src}
      alt="ImgError..."
      width={width}
      height={height}
      onClick={onClick}
      style={{ ...imageStyle }}
    />
  )
}

export default Image
