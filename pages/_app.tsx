import { AppProps } from 'next/app'
import styled from '@emotion/styled'
import '../styles/globals.css'
import UserProvider from '@contexts/UserProvider'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <RootContainer>
          <Component {...pageProps}></Component>
        </RootContainer>
      </UserProvider>
    </>
  )
}
const RootContainer = styled.div`
  position: relative;
  max-width: 425px;
  min-width: 320px;
  height: 100vh;
  margin: 0 auto;
  background-color: #000000;
  position: relative;
`
export default App
