import { useEffect } from 'react'
import useIntervalFn from './useIntervalFn'

<<<<<<< HEAD
const useInterval = (fn: any, ms: number) => {
=======
const useInterval = (fn: () => void, ms: number) => {
>>>>>>> fe358a9b5df160aaa35c23768a6bf54a03f00319
  const [run, clear] = useIntervalFn(fn, ms)

  useEffect(() => {
    run()

    return clear
  }, [run, clear])

  return clear
}

export default useInterval
