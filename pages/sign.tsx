import MUIButton from '@components/MUIButton'

const sign = () => {
  const onButtonClick = () => {
    alert('안녕')
  }

  return (
    <>
      <MUIButton
        onClick={onButtonClick}
        style={{
          color: 'white',
          height: '90px',
          width: '80%',
          borderRadius: '50px',
          backgroundColor: 'red',
        }}>
        테스트버튼
      </MUIButton>
    </>
  )
}

export default sign
