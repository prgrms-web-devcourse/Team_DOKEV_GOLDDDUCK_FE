import React from 'react'
import styled from '@emotion/styled'
import { InputText } from '@components/Input'
import Upload from '@components/Upload'
import Textarea from '@components/Textarea'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Text from '@components/Text'

interface GiftItem {
  content?: string
  image?: File
  giftType: 'TEXT' | 'IMAGE'
}

interface Props {
  category: string
  content: string
  useRefCheck: boolean
  contentList: GiftItem[]
  handleInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void
  onCilckMessage(): void
  hadleImageUpload(fileList: File[]): void
}

const PresentModal = ({
  category,
  content,
  contentList,
  useRefCheck,
  handleInput,
  onCilckMessage,
  hadleImageUpload,
}: Props) => {
  return (
    <>
      <PresentModalContainer>
        <Div>
          <InputText
            id="category"
            name="category"
            value={category}
            onChange={handleInput}
            placeholder="등록할 선물의 이름을 입력하세요."
            autoFocus
            style={{ width: '100%' }}
          />
        </Div>
        <Div>
          <UploadWrapper>
            <Upload
              id="setPresentImage"
              name="setPresentImage"
              onClick={hadleImageUpload}
              useRefCheck={useRefCheck}
            />
          </UploadWrapper>
        </Div>
        <Div style={{ position: 'relative' }}>
          <Textarea
            id="presentMessage"
            name="presentMessage"
            value={content}
            onChange={handleInput}
          />
          <PlusButton aria-label="add" onClick={onCilckMessage}>
            <AddIcon />
          </PlusButton>
        </Div>
        <Div>
          {contentList.map(({ content }, index) => (
            <Text
              key={index}
              size="SMALL"
              style={{
                borderTop: '1px solid #757575',
                paddingBottom: '8px',
                paddingTop: '8px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {content}
            </Text>
          ))}
        </Div>
      </PresentModalContainer>
    </>
  )
}

const PresentModalContainer = styled.div`
  height: 100%;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`
const Div = styled.div`
  margin-top: 8%;
`

const UploadWrapper = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
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
