import { useEffect } from 'react'
import useTimeoutFn from './useTimeoutFn'

const useDebounce = (fn: any, ms: number, deps: any) => {
  const [run, clear] = useTimeoutFn(fn, ms)

  useEffect(run, deps)

  return clear
}

export default useDebounce
