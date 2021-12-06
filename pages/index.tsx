
import Header from '@domains/Header'
import { FONT_SIZES } from '@utils/constants/sizes'
import { COLORS } from '@utils/constants/colors'
import MUIButton from '@components/MUIButton'

const main = () => {
  const onButtonClick = () => {
    alert('안녕')
  }

  return (
    <MainContainer>
      <Header />
      <Text>텍스트 컴포넌트</Text>
      <MUIButton
        onClick={onButtonClick}
        style={{
          color: 'white',
          height: '40px',
          width: '70%',
          borderRadius: '50px',
          backgroundColor: 'red',
          position: 'absolute',
          top: '210px',
          zIndex: '99',
        }}>
        이벤트 등록하기
      </MUIButton>
      <VideoBox src={'/video/Christmas_Tree.mp4'} autoPlay muted />
    </MainContainer>
  )
}

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const Text = styled.text`
  font-size: ${FONT_SIZES.LARGE};
  color: ${COLORS.WHITE};
  background-color: gray;
  position: absolute;
  top: 120px;
`

const VideoBox = styled.video`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 9;
`

export default main
