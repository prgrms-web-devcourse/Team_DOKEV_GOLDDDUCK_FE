import styled from '@emotion/styled'

const Header = () => {
  return (
    <>
      <div>헤더입니다</div>
      <Title>emotion 적용</Title>
    </>
  )
}

const Title = styled.div`
  font-size: 30px;
  color: Red;
`

export default Header
