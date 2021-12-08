import { useState } from 'react'

const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, typeof setValue] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key)

        return item ? JSON.parse(item) : initialValue
      } catch (e) {
        console.error(e)

        return initialValue
      }
    } else {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    if (typeof window !== 'undefined') {
      try {
        setStoredValue(value)
        localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.error(e)
      }
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage

// import { useState } from 'react'

// const useLocalStorage = <T,>(
//   key: string,
//   initialValue: T,
// ): [T, typeof setValue] => {
//   // if (typeof window !== 'undefined'){}
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       console.log('111')
//       const item = localStorage.getItem(key)

//       return item ? JSON.parse(item) : initialValue
//     } catch (e) {
//       console.error(e)

//       return initialValue
//     }
//   })

//   const setValue = (value: T) => {
//     console.log('22222')
//     try {
//       setStoredValue(value)
//       localStorage.setItem(key, JSON.stringify(value))
//     } catch (e) {
//       console.error(e)
//     }
//   }

//   return [storedValue, setValue]
// }

// export default useLocalStorage
