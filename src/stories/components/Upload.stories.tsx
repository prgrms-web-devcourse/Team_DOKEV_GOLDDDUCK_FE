import Upload from '@components/Upload'
import styled from '@emotion/styled'

export default {
  title: 'Components/Upload',
  component: Upload,
}

export const Default = () => {
  return (
    <>
      <Upload id="1" name="abc" droppable style={{ position: 'relative' }} />
      <Upload id="2" name="cc" droppable style={{ position: 'relative' }} />
    </>
  )
}

export const Multiple = () => {
  return <Upload id="1" name="abc" droppable style={{ position: 'relative' }} />
}

const Btn = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
