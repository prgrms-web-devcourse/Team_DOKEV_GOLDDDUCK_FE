import { useEffect } from 'react'

const useInfiniteScroll = (props: {
  root?: Element | Document | null | undefined
  target: Element | null
  onIntersect: IntersectionObserverCallback
  threshold?: number
  rootMargin?: string
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(props.onIntersect, {
      root: props.root || null,
      rootMargin: props.rootMargin || '0px',
      threshold: props.threshold || 1.0,
    })

    if (!props.target) {
      return
    }

    observer.observe(props.target)

    return () => observer.unobserve(props.target as Element)
  }, [
    props.target,
    props.root,
    props.rootMargin,
    props.onIntersect,
    props.threshold,
  ])
}

export default useInfiniteScroll
