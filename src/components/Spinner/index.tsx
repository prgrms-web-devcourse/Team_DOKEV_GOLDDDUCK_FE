import React from 'react'
import { CircularProgress } from '@mui/material'
import styled from '@emotion/styled'

const Spinner = (): React.ReactElement => {
  return (
    <Container
      style={{
        width: '100vw',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 0',
      }}>
      <CircularProgress
        sx={{
          color: '#ffd700',
        }}
      />
    </Container>
  )
}

const Container = styled.div``

export default Spinner
