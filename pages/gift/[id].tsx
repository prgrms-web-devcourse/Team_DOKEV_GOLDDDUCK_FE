import MUIButton from '@components/MUIButton'
import Header from '@domains/Header'
import styled from '@emotion/styled'
import Icon from '@components/Icon'
import Text from '@components/Text'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import giftImage from '/src/assets/gift_test.png'
import { useRouter } from 'next/router'
import GiftItem from '@domains/GiftItem'
import MUISwitch from '@components/MUISwitch'
import { useCallback, useEffect, useState } from 'react'
import { giftDetail } from '../api/services/gift'
import { getGiftDetail, updateGiftUsed } from '../api/gift'
import { useUserContext } from '@contexts/UserProvider'
import { GIFT_TYPE, IFilteredGiftDetail } from 'types/gift'
import { getUesrInfo } from '../api/user'
import { EVENT_TEMPLATE } from 'types/event'

const GiftDetailPage = () => {
  const router = useRouter()
  const { updateUser } = useUserContext()
  const { id: userId } = useUserContext().user
  const [isLoading, setIsLoading] = useState(false)
  const [gift, setGift] = useState<IFilteredGiftDetail | undefined>()
  const [used, setUsed] = useState<boolean>(gift?.used || false)

  // 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    const data = await getUesrInfo()
    if (data) {
      updateUser(data)
    } else {
      router.replace('/login')
    }
  }, [router])

  useEffect(() => {
    fetchUser()
  }, [])

  // 선물 데이터 조회
  const fetchGiftDetail = useCallback(
    async (giftId) => {
      if (userId) {
        setIsLoading(true)
        const data = await getGiftDetail(userId, giftId)
        data && setGift(giftDetail(data))
        setUsed(data.used)
        setIsLoading(false)
      }
    },
    [userId],
  )

  useEffect(() => {
    userId && router.isReady && fetchGiftDetail(router.query?.id)
  }, [userId, router.query.id])

  const handleChangeSwitch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsed(e.target.checked)
      userId && gift?._id && updateGiftUsed(userId, gift?._id, e.target.checked)
    },
    [userId, gift?._id],
  )

  return userId && !isLoading ? (
    <>
      <ContainerTop>
        <Header />
        <GiftInfo>
          <Wrapper>
            <Icon
              name="arrowBack"
              color="WHITE"
              style={{ marginRight: 8 }}
              onIconClick={() => router.push('/mypage?tab=gift')}
            />
            <Text size="BASE" color="WHITE">
              {gift?.category}
            </Text>
            <StyledSwitch>
              <Text size="MICRO" color="TEXT_GRAY_DARK">
                {'사용 여부'}
              </Text>
              <MUISwitch used={used} handleChange={handleChangeSwitch} />
            </StyledSwitch>
          </Wrapper>
          <Wrapper>
            <Text size="MICRO" color="TEXT_GRAY_LIGHT">
              {'받은 날짜'}
            </Text>
            <Text
              size="MICRO"
              color="TEXT_GRAY_LIGHT"
              style={{ fontWeight: 'bold', marginLeft: 8 }}>
              {gift?.receivedDate &&
                `${new Date(gift?.receivedDate).getFullYear()}년
                ${new Date(gift?.receivedDate).getMonth() + 1}월
                ${new Date(gift?.receivedDate).getDate()}일`}
            </Text>
            <Text
              size="MICRO"
              color="TEXT_GRAY_LIGHT"
              style={{ fontWeight: 'bold', marginLeft: 'auto' }}>
              from.{gift?.sender}
            </Text>
          </Wrapper>
          <GiftItem
            type={gift?.giftType as GIFT_TYPE}
            imageSrc={gift?.src}
            template={gift?.template as EVENT_TEMPLATE}
            message={gift?.message}
            imageStyle={imageStyle}
          />
        </GiftInfo>
      </ContainerTop>
      <ContainerBottom>
        <a href={giftImage.src} download>
          <MUIButton
            style={{
              width: '100%',
              backgroundColor: 'RED',
            }}>
            <Text color="WHITE" size="BASE">
              선물 저장
            </Text>
          </MUIButton>
        </a>
      </ContainerBottom>
    </>
  ) : (
    <></>
  )
}

const ContainerTop = styled.div`
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

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

export default GiftDetailPage
