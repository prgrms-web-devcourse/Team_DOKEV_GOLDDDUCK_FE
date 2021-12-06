import { useUserContext } from '@contexts/UserProvider'
import { useEffect } from 'react'

const testPageMuntari = () => {
  const { token } = useUserContext()

  useEffect(() => {
    console.log(token)
  })

  return <h1>token</h1>
}

export default testPageMuntari
