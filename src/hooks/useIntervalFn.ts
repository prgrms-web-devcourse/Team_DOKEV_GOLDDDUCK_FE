import { useCallback, useEffect, useRef } from 'react'

<<<<<<< HEAD
const useIntervalFn = (fn: any, ms: number) => {
  const intervalId = useRef<any>()
=======
const useIntervalFn = (fn: () => void, ms: number) => {
  const intervalId = useRef<NodeJS.Timer>()
>>>>>>> fe358a9b5df160aaa35c23768a6bf54a03f00319
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
