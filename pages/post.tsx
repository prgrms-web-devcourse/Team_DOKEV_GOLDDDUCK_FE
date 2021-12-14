import React, { useState } from 'react'
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

interface Props {
  activeStep: number
}

const steps = ['이벤트 정보', '타이머 설정', '선물 타입 설정', '선물 등록']

const post = () => {
  // stepper 로직
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())

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
      const data = {
        eventTitle,
        participant,
        coverImage,
        eventTypeState,
        gifts,
        startvalue,
        endvalue,
      }
      console.log(data)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  //step1 EventTitle 상태 로직
  const [eventTitle, setEventTitle] = useState('')
  const [participant, setParticipant] = useState<number | undefined>()
  const [coverImage, setCoverImage] = useState<string>('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === 'eventTitle'
      ? setEventTitle(() => e.target.value)
      : setParticipant(() => Number(e.target.value))
  }

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverImage(() => e.target.value)
  }

  //step2 EventTimer 상태 로직
  const [startvalue, setStartValue] = useState<Date | null>(new Date())
  const [endvalue, setEndValue] = useState<Date | null>(new Date())

  const handleStartTimer = (newValue: Date) => {
    setStartValue(newValue)
  }

  const handleEndTimer = (newValue: Date) => {
    setEndValue(newValue)
  }

  //setp3 EventType 상태 로직
  const [eventTypeState, setEventTypeState] = useState('')
  const handleTypeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventTypeState(() => e.target.value)
  }

  //step4 EventPresent 상태 로직
  interface Gift {
    category: string
    giftItems: GiftItem[]
  }

  interface GiftItem {
    content?: string
    image?: File
    giftType: 'TEXT' | 'IMAGE'
  }

  const [gifts, setGifts] = useState<Gift[]>([])

  const AddGiftItem = ({ category, giftItems }: Gift) => {
    setGifts((gift) => [...gift, { category, giftItems }])
  }

  // step별 컴포넌트 로직
  const getStepContent = (stepNumber: number) => {
    switch (stepNumber) {
      case 0:
        return (
          <EventTitle
            eventTitle={eventTitle}
            participant={participant}
            coverImage={coverImage}
            handleInput={handleInput}
            handleCoverImage={handleCoverImage}
          />
        )
      case 1:
        return (
          <EventTimer
            startvalue={startvalue}
            endvalue={endvalue}
            handleStartTimer={handleStartTimer}
            handleEndTimer={handleEndTimer}
          />
        )
      case 2:
        return (
          <EventType
            eventTypeState={eventTypeState}
            handleTypeCheck={handleTypeCheck}
          />
        )
      case 3:
        return <EventPresent gifts={gifts} AddGiftItem={AddGiftItem} />
      default:
        return
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
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
