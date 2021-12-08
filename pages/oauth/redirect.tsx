import styled from '@emotion/styled'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

const oauthPage = () => {
  const route = useRouter()

  useEffect(() => {
    console.log(route.query['token'])
  }, [route])

  return <Div>OuatPage</Div>
}

const Div = styled.div`
  color: white;
  font-size: 40px;
`

export default oauthPage
