import MUIButton from '@components/MUIButton'

const sign = () => {
  const onButtonClick = () => {
    alert('안녕')
  }

  return (
    <>
      <MUIButton
        onClick={onButtonClick}
        color={'white'}
        height={'90px'}
        width={'80%'}
        text={'테스트버튼'}
        border-radius={'50px'}
        background-color={'red'}></MUIButton>
    </>
  )
}

export default sign
