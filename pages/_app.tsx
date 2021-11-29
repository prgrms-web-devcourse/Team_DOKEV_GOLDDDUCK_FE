import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  const a = 123
  const b = [1, 2, 3, 4]

  return <Component {...pageProps} />
}

export default App
