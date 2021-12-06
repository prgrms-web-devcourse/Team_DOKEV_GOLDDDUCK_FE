import useLocalStorage from '@hooks/useLocalStorage'
import { createContext, ReactChild, useContext } from 'react'

interface IUserContext {
  token?: string[]
}

interface Props {
  children: ReactChild
}

const UserContext = createContext<IUserContext>({} as IUserContext)
export const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useLocalStorage<string[]>('token', [])

  return (
    <UserContext.Provider value={{ token }}>{children}</UserContext.Provider>
  )
}

export default UserProvider
