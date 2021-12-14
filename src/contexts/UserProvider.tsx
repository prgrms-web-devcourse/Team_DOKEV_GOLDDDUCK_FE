import useLocalStorage from '@hooks/useLocalStorage'
import {
  createContext,
  ReactChild,
  useCallback,
  useContext,
  useState,
} from 'react'

interface Iuser {
  id: number
  name: string
  socialId: string | null
  profileImage: string | null
}

interface IUserContext {
  token: string
  user: Iuser
  clearToken(): void
  updateToken(value: any): void
  updateUser(value: any): void
}

interface Props {
  children: ReactChild
}

const UserContext = createContext<IUserContext>({} as IUserContext)
export const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useLocalStorage<string>('token', '')
  const [user, setUser] = useState<Iuser>({
    id: 0,
    name: '',
    profileImage: '',
    socialId: '',
  })

  const updateUser = useCallback((userData: Iuser) => {
    setUser(userData)
  }, [])

  const updateToken = useCallback((tokenValue: string) => {
    setToken(tokenValue)
  }, [])

  const clearToken = useCallback(() => {
    setToken('')
  }, [])

  return (
    <UserContext.Provider
      value={{ token, user, clearToken, updateToken, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
