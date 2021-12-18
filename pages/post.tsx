import React, { useState, useCallback, useEffect } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import MUIButton from '@components/MUIButton'
import { ErrorAlert } from '@components/Swalert'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Text from '@components/Text'
import EventTimer from '@domains/EventTimer'
import EventTitle from '@domains/EventTitle'
import EventPresent from '@domains/EventPresent'
import EventType from '@domains/EventType/index'
import EventComplete from '@domains/EventComplete'
import { useRouter } from 'next/router'
import { useUserContext } from '@contexts/UserProvider'
import { getUesrInfo } from '../pages/api/user'
import { addEventApi } from '../pages/api/post'

interface Props {
  activeStep: number
}

const steps = ['이벤트 정보', '선물 타입 설정', '선물 등록', '타이머 설정']

const post = () => {
  const router = useRouter()

  // 사용자 정보 로직
  const { updateUser } = useUserContext()
  const [memberId, setMemberId] = useState()

  // 사용자 정보 API
  const getUserData = useCallback(async () => {
    const res = await getUesrInfo()
    setMemberId(res.id)
    res ? updateUser(res) : router.replace('/login')
  }, [])

  useEffect(() => {
    getUserData()
  }, [])

  // stepper 로직
  const [activeStep, setActiveStep] = useState(0)
  const [eventLink, setEventLink] = useState('')

  useEffect(() => {
    if (activeStep === 4) {
      setEventApi()
    }
  }, [activeStep])

  const handleNext = () => {
    if (activeStep === 0 && title && maxParticipantCount && mainTemplate) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else if (activeStep === 1 && giftChoiceType) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else if (activeStep === 2 && gifts.length > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else if (activeStep === 3 && startAt && endAt) {
      if (new Date() < startAt && startAt < endAt) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      } else {
        ErrorAlert('시작 시간, 종료 시간을 확인해 주세요!')
      }
    } else {
      ErrorAlert('모든 폼을 입력해주세요!')
    }
  }

  // api 호출 로직 모든 데이터 formData 형식
  const setEventApi = async () => {
    const offset = new Date().getTimezoneOffset() * 60000

    const startValue = new Date(Number(startAt) - Number(offset))
    const start = startValue.toISOString()

    const endValue = new Date(Number(endAt) - Number(offset))
    const end = endValue.toISOString()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('maxParticipantCount', String(maxParticipantCount))
    formData.append('mainTemplate', mainTemplate)
    formData.append('giftChoiceType', giftChoiceType)
    formData.append('startAt', start)
    formData.append('endAt', String(end))
    formData.append('memberId', String(memberId))

    gifts.map((gift, i) => {
      formData.append(`gifts[${i}].category`, gift.category)
      formData.append(`gifts[${i}].giftCheckId`, gift.giftCheckId)
      gift.giftItems.map((item, j) => {
        if (item.giftType === 'TEXT' && item.content) {
          formData.append(`gifts[${i}].giftItems[${j}].giftType`, 'TEXT')
          formData.append(`gifts[${i}].giftItems[${j}].content`, item.content)
        } else if (item.giftType === 'IMAGE' && item.image) {
          formData.append(`gifts[${i}].giftItems[${j}].giftType`, 'IMAGE')
          formData.append(`gifts[${i}].giftItems[${j}].image`, item.image)
        }
      })
    })
    await addEventApi(formData).then((res) => {
      setEventLink(res)
    })
  }

  //step1 EventTitle 상태 로직
  const [title, setTitle] = useState('')
  const [maxParticipantCount, setMaxParticipantCount] = useState<number>()
  const [mainTemplate, setMainTemplate] = useState<string>('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === 'title'
      ? setTitle(() => e.target.value)
      : setMaxParticipantCount(() => Number(e.target.value))
  }

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainTemplate(() => e.target.value)
  }

  //setp2 EventType 상태 로직
  const [giftChoiceType, setGiftChoiceType] = useState('')
  const handleTypeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGiftChoiceType(() => e.target.value)
  }

  //step3 EventPresent 상태 로직
  interface Gift {
    giftCheckId: string
    category: string
    giftItems: GiftItem[]
  }

  interface GiftItem {
    content?: string
    image?: File
    giftType: 'TEXT' | 'IMAGE'
  }

  const [gifts, setGifts] = useState<Gift[]>([])

  const AddGiftItem = ({ giftCheckId, category, giftItems }: Gift) => {
    setGifts((gifts) => [...gifts, { giftCheckId, category, giftItems }])
  }

  const delteGiftItem = (giftCheckId: string) => {
    const filterData = gifts.filter((gift) => gift.giftCheckId !== giftCheckId)
    setGifts(filterData)
  }

  //step4 EventTimer 상태 로직
  const [startAt, setStartAt] = useState<Date>(new Date())
  const [endAt, setEndAt] = useState<Date>(new Date())

  const handleStartTimer = (newValue: Date) => {
    setStartAt(newValue)
  }

  const handleEndTimer = (newValue: Date) => {
    setEndAt(newValue)
  }

  // step별 컴포넌트 로직
  const getStepContent = (stepNumber: number) => {
    switch (stepNumber) {
      case 0:
        return (
          <EventTitle
            title={title}
            maxParticipantCount={maxParticipantCount}
            mainTemplate={mainTemplate}
            handleInput={handleInput}
            handleCoverImage={handleCoverImage}
          />
        )
      case 1:
        return (
          <EventType
            giftChoiceType={giftChoiceType}
            handleTypeCheck={handleTypeCheck}
          />
        )
      case 2:
        return (
          <EventPresent
            gifts={gifts}
            AddGiftItem={AddGiftItem}
            delteGiftItem={delteGiftItem}
            maxParticipantCount={maxParticipantCount}
            giftChoiceType={giftChoiceType}
          />
        )
      case 3:
        return (
          <EventTimer
            startAt={startAt}
            endAt={endAt}
            handleStartTimer={handleStartTimer}
            handleEndTimer={handleEndTimer}
          />
        )
      default:
        return
    }
  }

  return (
    <>
      {activeStep === steps.length ? (
        <EventComplete eventLink={eventLink} giftChoiceType={giftChoiceType} />
      ) : (
        <PostContainer>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ paddingTop: '15px' }}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <Text size={'MICRO'} color={'WHITE'}>
                      {label}
                    </Text>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>

          <div style={{ color: 'white', height: '100%' }}>
            {getStepContent(activeStep)}
          </div>

          <StepButtonContainer>
            <DisplayStyle activeStep={activeStep}>
              <MUIButton
                style={{
                  color: '#ffffff',
                  backgroundColor: '#000000',
                }}
                onClick={() =>
                  setActiveStep((prevActiveStep) => prevActiveStep - 1)
                }
                sx={{ mr: 1 }}>
                Back
              </MUIButton>
            </DisplayStyle>

            <MUIButton
              style={{ color: '#ffffff', backgroundColor: '#CE000B' }}
              onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </MUIButton>
          </StepButtonContainer>
        </PostContainer>
      )}
    </>
  )
}

const PostContainer = styled.div`
  width: 100%;
  height: calc(100% - 150px);

  @media all and (max-width: 425px) {
    height: calc(100% - 120px);
  }
  @media all and (max-width: 320px) {
    height: calc(100% - 120px);
  }
`

const StepButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
`

const DisplayStyle = styled.div`
  ${({ activeStep }: Props) => {
    return activeStep === 0
      ? css`
          visibility: hidden;
        `
      : css`
          display: black;
        `
  }}
`

export default post
