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
    <EventTitleContainer>
      <TitleItem>
        <TextLabel title={'제목'} />
        <InputText
          id="title"
          name="title"
          value={title}
          onChange={handleInput}
          placeholder="이벤트의 제목을 입력해주세요. 15자 내외"
        />
      </TitleItem>
      <TitleItem>
        <TextLabel title={'참여인원수'} />
        <InputText
          id="maxParticipantCount"
          name="maxParticipantCount"
          value={maxParticipantCount || ''}
          onChange={handleInput}
          placeholder="참여할 수 있는 최대 인원수 입력"
        />
      </TitleItem>
      <TitleItem>
        <TextLabel title={'커버이미지'} />
        <Text size="MICRO" color="TEXT_GRAY_DARK">
          이벤트 커버 이미지는 편지지로 활용됩니다.
        </Text>
      </TitleItem>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          columnSpacing={3}
          rowSpacing={0}
          style={{ textAlign: 'center' }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item sm={4} xs={4} key={index}>
              <Image
                src={`/templates/template${index + 1}.png`}
                width="100%"
                height="75%"
                style={{ borderRadius: '16px' }}
              />
              <label htmlFor={`template${index + 1}`}>{`cover${
                index + 1
              }`}</label>
              <InputRadio
                id={`template${index + 1}`}
                value={`template${index + 1}`}
                name={'RadioGroup'}
                checked={mainTemplate === `template${index + 1}`}
                onChange={handleCoverImage}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </EventTitleContainer>
  )
}

const EventTitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 3%;
`

const TitleItem = styled.div`
  display: flex;
  width: 90%;
`

export default EventTitle
