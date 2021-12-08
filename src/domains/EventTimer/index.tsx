import React, { useState } from 'react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Stack from '@mui/material/Stack'

const EventTimer = () => {
  const [startvalue, setStartValue] = useState<Date | null>(new Date())
  const [endvalue, setEndValue] = useState<Date | null>(new Date())
  //const [startTimer, setStartTimer] = useState<Date | null>()

  return (
    <EventTimerContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <CustomDateTimePicker
            className="MuiOutlinedInput-input MuiOutlinedInput-root"
            renderInput={(params) => <TextField {...params} />}
            label="시작 시간"
            value={startvalue}
            onChange={(newValue: Date | null) => {
              setStartValue(newValue)
            }}
            minDateTime={new Date()}
          />
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            label="종료 시간"
            value={endvalue}
            onChange={(newValue) => {
              setEndValue(newValue)
            }}
            minDate={startvalue}
            minTime={startvalue}
          />
        </Stack>
      </LocalizationProvider>
    </EventTimerContainer>
  )
}

const EventTimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CustomDateTimePicker = styled(DateTimePicker)(() => ({
  '& .MuiOutlinedInput-input': {
    backgroundColor: 'white',
    color: 'red',
  },
}))
export default EventTimer
