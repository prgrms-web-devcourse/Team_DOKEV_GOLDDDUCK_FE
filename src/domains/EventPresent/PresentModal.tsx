import React, { useState } from 'react'
import styled from '@emotion/styled'
import { InputText } from '@components/Input'
import Upload from '@components/Upload'
import Textarea from '@components/Textarea'
import MUIButton from '@components/MUIButton'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Text from '@components/Text'

interface Props {
  id: number
  text: string
}

const messageDate: Props[] = [
  {
    id: 1,
    text: '안녕하세요!',
  },
  {
    id: 2,
    text: '프로그래머스 굿즈 이벤트 1',
  },
  {
    id: 3,
    text: '프로그래머스 굿즈 이벤트 2 당첨자 입니다. 확인을 위해서는 방문해주세요',
  },
]

const PresentModal = () => {
  const [presentTitle, setPresentTitle] = useState('')
  const [presentMessageList, setPresentMessageList] =
    useState<Props[]>(messageDate)
  const [presentMessage, setPresentMessage] = useState('')
  const [presentImage, setPresentImage] = useState<File[]>()

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.name === 'presentTitle'
      ? setPresentTitle(e.target.value)
      : setPresentMessage(e.target.value)
  }

  const onCilckMessage = () => {
    setPresentMessageList([
      ...presentMessageList,
      { id: 4, text: presentMessage },
    ])
    setPresentMessage('')
  }

  const hadleImageUpload = (fileList: File[]) => {
    console.log(fileList)
    setPresentImage(fileList)
  }

  return (
    <>
      <PresentModalContainer>
        <Div>
          <InputText
            id="presentTitle"
            name="presentTitle"
            value={presentTitle}
            onChange={handleInput}
            placeholder="등록할 선물의 이름을 입력하세요."
            style={{ width: '100%' }}
          />
        </Div>
        <Div style={{ overflowX: 'scroll' }}>
          <Upload
            id="setPresentImage"
            name="setPresentImage"
            onClick={hadleImageUpload}></Upload>
        </Div>
        <Div style={{ position: 'relative' }}>
          <Textarea
            id="presentMessage"
            name="presentMessage"
            value={presentMessage}
            onChange={handleInput}
            // style={{ position: 'relative' }}
          />
          <PlusButton aria-label="add" onClick={onCilckMessage}>
            <AddIcon />
          </PlusButton>
        </Div>
        <Div>
          {presentMessageList.map(({ text }) => (
            <Text
              size="SMALL"
              style={{
                borderTop: '1px solid #757575',
                paddingBottom: '8px',
                paddingTop: '8px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {text}
            </Text>
          ))}
        </Div>
      </PresentModalContainer>
    </>
  )
}

const PresentModalContainer = styled.div`
  /* margin-top: 10%; */
  height: 100%;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  /* background-color: red; */
`
const Div = styled.div`
  margin-top: 8%;
`

const PlusButton = styled(Fab)(() => ({
  position: 'absolute',
  bottom: '5px',
  right: '5px',
  height: '40px',
  width: '40px',
  color: 'white',
  backgroundColor: 'red',
  '&:hover': { backgroundColor: 'red', filter: 'brightness(0.9)' },
}))

export default PresentModal
