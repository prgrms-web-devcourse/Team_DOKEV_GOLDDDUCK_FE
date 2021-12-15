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
  title: string
  maxParticipantCount: number | undefined
  mainTemplate: string
}

const EventTitle: React.FC<Props> = ({
  title,
  maxParticipantCount,
  mainTemplate,
  handleInput,
  handleCoverImage,
}) => {
  return (
    <>
      <EventTitleContainer>
        <Div>
          <TextLabel title={'제목'} />
          <InputText
            id="title"
            name="title"
            value={title}
            onChange={handleInput}
            placeholder="이벤트의 제목을 입력해주세요. 15자 내외"
          />
        </Div>

        <Div>
          <TextLabel title={'참여인원수'} />
          <InputText
            id="maxParticipantCount"
            name="maxParticipantCount"
            value={maxParticipantCount}
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
            <Grid
              container
              columnSpacing={4}
              rowSpacing={1}
              style={{
                justifyContent: 'center',
              }}>
              {Array.from(Array(6)).map((_, index) => (
                <Grid item sm={4} key={index}>
                  <Image
                    src={`/templates/template${index + 1}.png`}
                    width={100}
                    height={140}
                    style={{ borderRadius: '10px' }}
                  />
                  <Div>
                    <label htmlFor={`template${index + 1}`}>{`template${
                      index + 1
                    }`}</label>
                    <InputRadio
                      id={`template${index + 1}`}
                      value={`template${index + 1}`}
                      name={'RadioGroup'}
                      checked={mainTemplate === `template${index + 1}`}
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
  padding-top: 5%;
`

const Div = styled.div`
  padding-top: 5%;
  width: calc(100% - 32px);
  margin: 0 auto;
  display: flex;
  align-items: center;
`

export default EventTitle
