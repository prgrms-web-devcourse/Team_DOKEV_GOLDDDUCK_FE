import styled from '@emotion/styled'
import { useRef, useEffect, useState } from 'react'

interface IImage {
  src: string
  block: boolean
  iscircle: boolean
  style?: React.CSSProperties
  mode?: 'fill' | 'contain' | 'cover'
  width?: number
  height?: number
  lazy?: boolean
  threshold?: number
  placeholder?: string
}

let observer = null
const LOAD_IMG_EVENT_NAME = 'loadImage'

const onIntersection: IntersectionObserverCallback = (entries, io) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target)
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_NAME))
    }
  })
}

const Image = ({
  src,
  block,
  iscircle,
  style,
  mode = 'cover',
  width = 180,
  height = 240,
  lazy = false,
  threshold = 0.2,
  placeholder = 'https://via.placeholder.com/180x240',
}: IImage): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const imageStyle: React.CSSProperties = {
    display: block ? 'block' : 'inline',
    objectFit: mode,
    borderRadius: iscircle ? '50%' : undefined,
    ...style,
  }

  useEffect(() => {
    if (!lazy) {
      setLoaded(true)

      return
    }
    const handleLoadImage = () => setLoaded(true)
    const imgElement = imgRef.current
    imgElement &&
      imgElement.addEventListener(LOAD_IMG_EVENT_NAME, handleLoadImage)

    return () => {
      imgElement &&
        imgElement.removeEventListener(LOAD_IMG_EVENT_NAME, handleLoadImage)
    }
  }, [lazy])

  useEffect(() => {
    if (!lazy) return
    observer = new IntersectionObserver(onIntersection, { threshold })
    imgRef.current && observer.observe(imgRef.current)
  }, [lazy, threshold])

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt="ImgError..."
      width={width}
      height={height}
      style={{ ...imageStyle }}
    />
  )
}

export default Image
