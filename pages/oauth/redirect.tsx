import { useUserContext } from '@contexts/UserProvider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const oauthPage = () => {
  const { updateToken } = useUserContext()
  const route = useRouter()

  useEffect(() => {
    if (route.query['token']) {
      const token = route.query['token']
      updateToken(token)
      route.replace('/')
    }
  }, [route])

  return <div>OauthRedirectPage</div>
}

export default oauthPage
