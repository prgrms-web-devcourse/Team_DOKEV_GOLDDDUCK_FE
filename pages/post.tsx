import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Text from '@components/Text'

interface Props {
  activeStep: number
}

const steps = ['이벤트 정보', '타이머 설정', '선물 타입 설정', '선물 등록']

const post = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())

  const getStepContent = (stepNumber: number) => {
    switch (stepNumber) {
      case 0:
        return '스텝 1에서는 ... 하세요'
      case 1:
        return '스텝 2에서는 ... 하세요'
      case 2:
        return '스텝 3에서는 ... 하세요'
      case 3:
        return '스텝 4에서는 ...하세요'
      default:
        return
    }
  }

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
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  //   const handleSkip = () => {
  //     if (!isStepOptional(activeStep)) {
  //       // You probably want to guard against something like this,
  //       // it should never occur unless someone's actively trying to break something.
  //       throw new Error("You can't skip a step that isn't optional.")
  //     }

  //     setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //     setSkipped((prevSkipped) => {
  //       const newSkipped = new Set(prevSkipped.values())
  //       newSkipped.add(activeStep)

  //       return newSkipped
  //     })
  //   }

  //   const handleReset = () => {
  //     setActiveStep(0)
  //   }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          //   if (isStepOptional(index)) {
          //     labelProps.optional = (
          //       <Typography variant="caption">Optional</Typography>
          //     )
          //   }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }

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
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <MUIButton onClick={handleReset}>Reset</MUIButton>
          </Box>
        </>
      ) :  */}

      <>
        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
        <div style={{ color: 'white' }}>{getStepContent(activeStep)}</div>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <DisplayStyle activeStep={activeStep}>
            <MUIButton
              style={{ color: '#ffffff', backgroundColor: '#000000' }}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              Back
            </MUIButton>
          </DisplayStyle>

          <Box sx={{ flex: '1 1 auto' }} />
          <MUIButton
            style={{ color: '#ffffff', backgroundColor: '#CE000B' }}
            onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </MUIButton>
        </Box>
      </>
    </Box>
  )
}

const DisplayStyle = styled.div`
  ${({ activeStep }: Props) => {
    return activeStep === 0
      ? css`
          display: none;
        `
      : css`
          display: black;
        `
  }}
`

export default post
