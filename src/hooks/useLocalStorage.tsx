import { useState } from 'react'

const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, typeof setValue] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (e) {
      console.error(e)

      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
