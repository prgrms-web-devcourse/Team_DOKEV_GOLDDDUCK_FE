import React, { useState, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Text from '@components/Text'
import EventTimer from '@domains/EventTimer'
import EventTitle from '@domains/EventTitle'
import EventPresent from '@domains/EventPresent'
import EventType from '@domains/EventType/index'
import { useRouter } from 'next/router'
import { useUserContext } from '@contexts/UserProvider'
import { getUesrInfo } from '../pages/api/user'
import { addEventApi } from '../pages/api/post'

interface Props {
  activeStep: number
}

const steps = ['이벤트 정보', '선물 타입 설정', '선물 등록', '타이머 설정']

const post = () => {
  // 사용자 정보 로직
  const { updateUser } = useUserContext()
  const router = useRouter()
  const [memberId, setMemberId] = useState(1)

  // // 사용자 정보 API
  // const getUserData = useCallback(async () => {
  //   const res = await getUesrInfo()
  //   console.log(res)
  //   setMemberId(res.id)
  //   res ? updateUser(res) : router.replace('/login')
  // }, [])

  // useEffect(() => {
  //   getUserData()
  // }, [])

  // stepper 로직
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())

  //
  const isStepOptional = (step: number) => {
    return step === 1
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)

    if (activeStep === 4) {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('maxParticipantCount', String(maxParticipantCount))
      formData.append('mainTemplate', mainTemplate)
      formData.append('giftChoiceType', giftChoiceType)
      formData.append('startAt', String(startAt.toISOString()))
      formData.append('endAt', String(endAt.toISOString()))
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
      addEventApi(formData)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  //step1 EventTitle 상태 로직
  const [title, setTitle] = useState('')
  const [maxParticipantCount, setMaxParticipantCount] = useState<
    number | undefined
  >()
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
    <Box sx={{ width: '100%' }}>
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
      {/* {activeStep === steps.length ? (
        <>안녕</>
      ) : ( */}
      <>
        <div style={{ color: 'white' }}>{getStepContent(activeStep)}</div>

        <StepButtonContainer>
          <DisplayStyle activeStep={activeStep}>
            <MUIButton
              style={{
                color: '#ffffff',
                backgroundColor: '#000000',
              }}
              onClick={handleBack}
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
      </>
      {/* )} */}
    </Box>
  )
}

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
