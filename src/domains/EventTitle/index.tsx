import React, { useState } from 'react'
import { InputText, InputRadio } from '@components/Input'
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
            autoFocus
          />
        </Div>

        <Div>
          <TextLabel title={'참여인원수'} />
          <InputText
            id="maxParticipantCount"
            name="maxParticipantCount"
            value={maxParticipantCount || ''}
            onChange={handleInput}
            placeholder="참여할 수 있는 최대 인원수 입력"
          />
        </Div>

        <Div>
          <TextLabel title={'커버이미지'} />
          <Text
            size="MICRO"
            color="TEXT_GRAY_DARK"
            style={{
              paddingTop: '8px',
              paddingLeft: '10%',
              whiteSpace: 'nowrap',
            }}>
            이벤트 커버 이미지는 편지지로 활용됩니다.
          </Text>
        </Div>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            columnSpacing={'1%'}
            rowSpacing={2}
            style={{
              width: 332,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
            }}>
            {Array.from(Array(9)).map((_, index) => (
              <Grid item sm={4} xs={4} key={index}>
                <div
                  style={{
                    borderRadius: 4,
                    backgroundImage: `url(/templates/template${index + 1}.png)`,
                    width: 100,
                    height: 142,
                    backgroundSize: 'cover',
                    opacity:
                      mainTemplate === `template${index + 1}` ||
                      (!mainTemplate && index) === 0
                        ? 1
                        : 0.7,
                  }}>
                  <label htmlFor={`template${index + 1}`} />
                  <InputRadio
                    id={`template${index + 1}`}
                    value={`template${index + 1}`}
                    name={'RadioGroup'}
                    checked={
                      mainTemplate === `template${index + 1}` ? true : false
                    }
                    onChange={handleCoverImage}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </EventTitleContainer>
    </>
  )
}

const EventTitleContainer = styled.div`
  height: calc(100% - 132px);
  padding: 16px 0;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const Div = styled.div`
  padding-top: 5%;
  width: calc(100% - 32px);
  margin: 0 auto;
  display: flex;
  align-items: center;
`

export default EventTitle
