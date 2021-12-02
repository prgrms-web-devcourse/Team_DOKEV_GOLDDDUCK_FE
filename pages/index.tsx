import styled from '@emotion/styled'

export default function Home() {
  return <ExampleBtn>Button</ExampleBtn>
}

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
