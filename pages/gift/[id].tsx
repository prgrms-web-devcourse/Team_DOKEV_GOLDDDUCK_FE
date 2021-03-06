import MUIButton from '@components/MUIButton'
import Header from '@domains/Header'
import styled from '@emotion/styled'
import Icon from '@components/Icon'
import Text from '@components/Text'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import html2canvas from 'html2canvas'
import { useRouter } from 'next/router'
import GiftItem from '@domains/GiftItem'
import MUISwitch from '@components/MUISwitch'
import { useCallback, useEffect, useRef, useState } from 'react'
import { giftDetail } from '../api/services/gift'
import { getGiftDetail, updateGiftUsed } from '../api/gift'
import { useUserContext } from '@contexts/UserProvider'
import { GIFT_TYPE, IFilteredGiftDetail } from 'types/gift'
import { getUserInfo } from '../api/user'
import { EVENT_TEMPLATE } from 'types/event'

const GiftDetailPage = () => {
  const router = useRouter()
  const { updateUser } = useUserContext()
  const { id: userId } = useUserContext().user
  const [isLoading, setIsLoading] = useState(false)
  const [gift, setGift] = useState<IFilteredGiftDetail | undefined>()
  const [used, setUsed] = useState<boolean>(gift?.used || false)
  const saveTarget = useRef(null)

  // 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    const data = await getUserInfo()
    if (data) {
      updateUser(data)
    } else {
      sessionStorage.setItem('next_url', `/gift/${router?.query.id}`)
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    fetchUser()
  }, [router])

  // 선물 데이터 조회
  const fetchGiftDetail = useCallback(
    async (giftId) => {
      setIsLoading(true)
      const data = await getGiftDetail(giftId)
      data && setGift(giftDetail(data))
      setUsed(data.used)
      setIsLoading(false)
    },
    [userId],
  )

  useEffect(() => {
    userId && router.isReady && fetchGiftDetail(router.query?.id)
  }, [userId, router.query.id, fetchGiftDetail])

  const handleChangeSwitch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsed(e.target.checked)
      userId && gift?._id && updateGiftUsed(userId, gift?._id, e.target.checked)
    },
    [router, userId, gift?._id],
  )

  // download html as png
  const onCapture = () => {
    saveTarget.current &&
      html2canvas(saveTarget?.current as HTMLElement).then((canvas) => {
        onSaveAs(canvas.toDataURL('image/png'), `my_gift_${gift?.category}.png`)
      })

    const onSaveAs = (uri: string, filename: string) => {
      const link = document.createElement('a')
      document.body.appendChild(link)
      link.href = uri
      link.download = filename
      link.click()
      document.body.removeChild(link)
    }
  }

  return userId && !isLoading ? (
    <>
      <ContainerTop>
        <Header />
        <GiftInfo>
          <Wrapper style={{ width: '100%' }}>
            <Icon
              name="arrowBack"
              size="MEDIUM"
              color="WHITE"
              style={{ marginRight: 8 }}
              onIconClick={() =>
                router.push(
                  `/mypage?tab=gift&filter=${gift?.used ? 'used' : 'un_used'}`,
                )
              }
            />
            <Text size="MEDIUM" color="WHITE">
              {gift?.category}
            </Text>
            <StyledSwitch>
              <Text size="MICRO" color="TEXT_GRAY_DARK">
                {'사용 여부'}
              </Text>
              <MUISwitch used={used} handleChange={handleChangeSwitch} />
            </StyledSwitch>
          </Wrapper>
          <Wrapper style={{ width: 320 }}>
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
          <div ref={saveTarget}>
            <GiftItem
              type={gift?.giftType as GIFT_TYPE}
              imageSrc={gift?.src}
              template={gift?.template as EVENT_TEMPLATE}
              message={gift?.message}
              imageStyle={imageStyle}
              textStyle={textStyle}
            />
          </div>
        </GiftInfo>
      </ContainerTop>
      <ContainerBottom onClick={() => gift?.giftType === 'TEXT' && onCapture()}>
        {gift?.giftType === 'IMAGE' ? (
          <a href={gift?.src} download>
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
        ) : (
          <MUIButton
            style={{
              width: '100%',
              backgroundColor: 'RED',
            }}>
            <Text color="WHITE" size="BASE">
              선물 저장
            </Text>
          </MUIButton>
        )}
      </ContainerBottom>
    </>
  ) : (
    <></>
  )
}

const ContainerTop = styled.div`
  height: calc(100% - 72px);
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
const GiftInfo = styled.div`
  position: relative;
  height: (100% - 88px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${DEFAULT_MARGIN};
  background-color: inherit;
`
const Wrapper = styled.div`
  display: flex;
  margin: 8px auto;
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
  width: 320,
  height: '100%',
  margin: '0 auto',
}

const textStyle: React.CSSProperties = {
  width: 320,
  height: 450,
  minHeight: 450,
  margin: '0 auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  borderRadius: 4,
}

export default GiftDetailPage
