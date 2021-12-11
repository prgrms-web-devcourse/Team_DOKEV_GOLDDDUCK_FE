import React, { useState } from 'react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Stack from '@mui/material/Stack'
import Text from '@components/Text'

interface Props {
  startvalue: Date | null
  endvalue: Date | null
  handleStartTimer(e: Date | null): void
  handleEndTimer(e: Date | null): void
}

const EventTimer = ({
  startvalue,
  endvalue,
  handleStartTimer,
  handleEndTimer,
}: Props) => {
  return (
    <EventTimerContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CustomStack spacing={8}>
          <div>
            <Text style={{ paddingBottom: '5px' }}>이벤트 시작 시간</Text>
            <DateTimePicker
              className="startvalue"
              renderInput={(params) => <TextField {...params} />}
              value={startvalue}
              onChange={(newValue) => {
                handleStartTimer(newValue)
              }}
              minDateTime={new Date()}
            />
          </div>

          <div>
            <Text style={{ paddingBottom: '5px' }}>이벤트 종료 시간</Text>
            <DateTimePicker
              className="endvalue"
              renderInput={(params) => <TextField {...params} />}
              value={endvalue}
              onChange={(newValue) => {
                handleEndTimer(newValue)
              }}
              minDateTime={startvalue}
            />
          </div>
        </CustomStack>
      </LocalizationProvider>
    </EventTimerContainer>
  )
}

const EventTimerContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CustomStack = styled(Stack)(() => ({
  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': { color: 'white' },
  '& .MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-colorPrimary.Mui-error.MuiInputBase-formControl.MuiInputBase-adornedEnd.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root':
    { border: 'none' },
  '& .MuiInputBase-colorPrimary.Mui-focused': { border: 'none' },
  '& .MuiInputBase-colorPrimary': {
    border: '1px solid white',
    borderBlockColor: 'white',
  },
  '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-i4bv87-MuiSvgIcon-root': {
    color: 'white',
  },
}))

export default EventTimer
