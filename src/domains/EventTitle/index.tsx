import React from 'react'
import { InputText, InputRadio } from '@components/Input'
import Image from '@components/Image'
import TextLabel from '@domains/TextLabel'
import Text from '@components/Text'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

interface Props {
  handleInput(e: React.ChangeEvent<HTMLInputElement>): void
  handleCoverImage(e: React.ChangeEvent<HTMLInputElement>): void
  eventTitle: string
  participant: number | undefined
  coverImage: string
}

const EventTitle: React.FC<Props> = ({
  eventTitle,
  participant,
  coverImage,
  handleInput,
  handleCoverImage,
}) => {
  return (
    <>
      <EventTitleContainer>
        <Div>
          <TextLabel title={'제목'} />
          <InputText
            id="eventTitle"
            name="eventTitle"
            value={eventTitle}
            onChange={handleInput}
            placeholder="이벤트의 제목을 입력해주세요. 15자 내외"
          />
        </Div>

        <Div>
          <TextLabel title={'참여인원수'} />
          <InputText
            id="participant"
            name="participant"
            value={participant}
            onChange={handleInput}
            placeholder="참여할 수 있는 최대 인원수 입력"
          />
        </Div>

        <Div>
          <TextLabel title={'커버이미지'} />
          <Text
            size="MICRO"
            color="TEXT_GRAY_DARK"
            style={{ paddingTop: '8px', paddingLeft: '10%' }}>
            이벤트 커버 이미지는 편지지로 활용됩니다.
          </Text>
        </Div>

        <Div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container columnSpacing={2} rowSpacing={6}>
              {Array.from(Array(6)).map((_, index) => (
                <Grid item sm={4} key={index}>
                  <Image
                    src={`/cover/cover${index + 1}.png`}
                    width={120}
                    height={160}
                  />
                  <Div>
                    <label htmlFor={`cover${index + 1}`}>{`cover${
                      index + 1
                    }`}</label>
                    <InputRadio
                      id={`cover${index + 1}`}
                      value={`cover${index + 1}`}
                      name={'RadioGroup'}
                      checked={coverImage === `cover${index + 1}`}
                      onChange={handleCoverImage}
                    />
                  </Div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Div>
      </EventTitleContainer>
    </>
  )
}

const EventTitleContainer = styled.div`
  margin-top: 10%;
`

const Div = styled.div`
  padding-top: 10%;
  width: calc(100% - 32px);
  margin: 0 auto;
  display: flex;
  align-items: center;
`

export default EventTitle
