import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

const oauthPage = () => {
  const route = useRouter()

  useEffect(() => {
    route.query['token'] &&
      localStorage.setItem('token', JSON.stringify(route.query['token']))
    //api 겟 유저 함수 실행

    //로그인 후 뒤로가기를 누르면 메인이 계속 보여짐
    route.push('/')
  }, [route])

  return <div>OauthRedirectPage</div>
}

export default oauthPage
