import { useUserContext } from '@contexts/UserProvider'
import { useEffect } from 'react'

const testPageMuntari = () => {
  const { token, user, clearStorage } = useUserContext()

  useEffect(() => {
    console.log('Token', token)
    console.log('User', user)
  })

  return <button onClick={clearStorage}>ClearStorage</button>
}

export default testPageMuntari
