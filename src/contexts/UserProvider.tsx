import useLocalStorage from '@hooks/useLocalStorage'
import { createContext, ReactChild, useCallback, useContext } from 'react'

interface IUserContext {
  token: string[]
  user: object
  clearToken(): void
  clearUser(): void
}

interface Props {
  children: ReactChild
}

const UserContext = createContext<IUserContext>({} as IUserContext)
export const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useLocalStorage<string[]>('Token', [])
  const [user, setUser] = useLocalStorage<object[]>('User', [])

  const clearToken = useCallback(() => {
    setToken([])
  }, [])

  const clearUser = useCallback(() => {
    setUser([])
  }, [])

  return (
    <UserContext.Provider value={{ token, user, clearToken, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
