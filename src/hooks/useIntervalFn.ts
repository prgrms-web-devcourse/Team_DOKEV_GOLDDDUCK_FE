import { useCallback, useEffect, useRef } from 'react'

const useIntervalFn = (fn: () => void, ms: number) => {
  const intervalId = useRef<NodeJS.Timer>()
  const callback = useRef(fn)

  useEffect(() => {
    callback.current = fn
  }, [fn])

  const run = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current)

    intervalId.current = setInterval(() => {
      callback.current()
    }, ms)
  }, [ms])

  const clear = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current)
  }, [])

  useEffect(() => clear, [clear])

  return [run, clear]
}

export default useIntervalFn
