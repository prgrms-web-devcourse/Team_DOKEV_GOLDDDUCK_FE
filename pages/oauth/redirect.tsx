import { useUserContext } from '@contexts/UserProvider'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const oauthPage = () => {
  const { updateToken } = useUserContext()
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    sessionStorage && setNextUrl(sessionStorage.getItem('next_url'))
  }, [])

  useEffect(() => {
    if (router.query['token']) {
      const token = router.query['token']
      updateToken(token)
      if (nextUrl) {
        router.push(nextUrl)
      } else {
        router.push('/')
      }
    }
  }, [router])

  return <div>OauthRedirectPage</div>
}

export default oauthPage
