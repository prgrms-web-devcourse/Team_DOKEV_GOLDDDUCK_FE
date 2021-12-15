import { useUserContext } from '@contexts/UserProvider'
import { useRouter } from 'next/router'

const logOut = () => {
  const route = useRouter()
  const { clearToken } = useUserContext()

  clearToken()
  route.push('/login')
}

export default logOut
