import { AppProps } from 'next/app'
import styled from '@emotion/styled'
import '../styles/globals.css'
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RootContainer>
        <Component {...pageProps}></Component>
      </RootContainer>
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
