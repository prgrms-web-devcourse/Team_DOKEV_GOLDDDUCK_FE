import styled from '@emotion/styled'

export default function Home() {
  return (
    <AppContainer>
      <ExampleBtn>Button</ExampleBtn>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  max-width: 425px;
  min-width: 320px;
  height: 100vh;
  margin: 0 auto;
  background-color: #000000;
`
const ExampleBtn = styled.button`
  background-color: red;
  width: calc(80% - 32px);
  margin: 0 auto;
  height: 32px;
  border-radius: 20px;
  display: block;
  border: none;
  cursor: pointer;
`
