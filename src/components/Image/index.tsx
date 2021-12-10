import { keyframes } from '@emotion/react'

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
      style={{ ...imageStyle, ...a }}
    />
  )
}

const FirstfadeIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }

  30%, 70% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(3);
    opacity: 0;
    }
`

const a: React.CSSProperties = {
  animation: `${FirstfadeIn} 2s liner`,
}

export default Image
