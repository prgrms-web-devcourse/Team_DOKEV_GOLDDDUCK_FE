import { useUserContext } from '@contexts/UserProvider'
import { useEffect } from 'react'

const testPageMuntari = () => {
  const { token, user, clearToken, clearUser } = useUserContext()

  useEffect(() => {
    console.log('Token', token)
    console.log('User', user)
  })

  return (
    <>
      <button onClick={clearToken}>clearToken</button>
      <button onClick={clearUser}>clearUser</button>
    </>
  )
}

export default testPageMuntari
