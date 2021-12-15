import MUIButton from '@components/MUIButton'
import Header from '@domains/Header'
import styled from '@emotion/styled'
import Image from '@components/Image'
import Icon from '@components/Icon'
import Text from '@components/Text'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import giftImage from '/src/assets/gift_test.png'
import { useState } from 'react'
import Switch from '@mui/material/Switch'
import { COLORS } from '@utils/constants/colors'
import { useRouter } from 'next/router'
import GiftItem from '@domains/GiftItem'

const CustomSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase': {},
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'red',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: `${COLORS.RED}`,
  },
  '& .MuiSwitch-track': {
    backgroundColor: `${COLORS.TEXT_GRAY_DARK}`,
    padding: 0,
  },
}))

const MUISwitch = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <CustomSwitch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  )
}

const GiftDetailPage = () => {
  const router = useRouter()

  return (
    <>
      <GiftContainerTop>
        <Header />
        <GiftInfo>
          <Wrapper>
            <Icon
              name={'arrowBack'}
              color={'WHITE'}
              style={{ marginRight: 8 }}
              onIconClick={() => router.push('/mypage?tab=gift')}
            />
            <Text size={'BASE'} color={'WHITE'}>
              {'시원한 아이스아메리카노'}
            </Text>
            <StyledSwitch>
              <Text size={'MICRO'} color={'TEXT_GRAY_DARK'}>
                {'사용 여부'}
              </Text>
              <MUISwitch />
            </StyledSwitch>
          </Wrapper>
          <Wrapper>
            <Text size={'MICRO'} color={'TEXT_GRAY_LIGHT'}>
              {'받은 날짜'}
            </Text>
            <Text
              size={'MICRO'}
              color={'TEXT_GRAY_LIGHT'}
              style={{ fontWeight: 'bold', marginRight: 8 }}>
              {'2021년 12월 1일 12시 30분'}
            </Text>
            <Text
              size={'MICRO'}
              color={'TEXT_GRAY_LIGHT'}
              style={{ fontWeight: 'bold', marginLeft: 'auto' }}>
              {'from.문타리'}
            </Text>
          </Wrapper>
          <GiftItem
            type="TEXT"
            imageSrc={giftImage.src}
            template={'template2'}
            message={`react 서버는 이를 다시 브라우저를 통해 통신한다`}
          />
        </GiftInfo>
      </GiftContainerTop>
      <ContainerBottom>
        <a href={giftImage.src} download>
          <MUIButton
            style={{
              width: '100%',
              backgroundColor: 'RED',
            }}>
            <Text color={'WHITE'} size={'BASE'}>
              선물 저장
            </Text>
          </MUIButton>
        </a>
      </ContainerBottom>
    </>
  )
}

const GiftContainerTop = styled.div`
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const GiftInfo = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${DEFAULT_MARGIN};
  background-color: inherit;
`

const Wrapper = styled.div`
  display: flex;
  margin: 8px 0;
  align-items: center;
`

const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`

const ContainerBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 0;
  background-color: inherit;
  padding: ${DEFAULT_MARGIN};
`

export default GiftDetailPage
