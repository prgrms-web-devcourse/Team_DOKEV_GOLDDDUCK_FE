import Logo from '@components/Logo'
import Text from '@components/Text'

const testPagePartro = () => {
  return (
    <>
      <Logo size="large"></Logo>
      <Logo size="small"></Logo>
      <Text size={'LARGE'} color={'TEXT_GRAY_DARK'}>
        안녕하세요
      </Text>
      <Text size={'SMALL'} color={'WHITE'}>
        안녕하세요
      </Text>
    </>
  )
}

export default testPagePartro
