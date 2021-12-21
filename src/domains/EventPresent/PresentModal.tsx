import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { InputText } from '@components/Input'
import Upload from '@components/Upload'
import Textarea from '@components/Textarea'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Icon from '@components/Icon'
import Text from '@components/Text'
import MUIButton from '@components/MUIButton'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'

interface GiftItem {
  content?: string
  image?: File
  giftType: 'TEXT' | 'IMAGE'
  MessageId?: string
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
  delteMessage(e: string | undefined): void
}

const PresentModal = ({
  category,
  content,
  contentList,
  useRefCheck,
  handleInput,
  onCilckMessage,
  hadleImageUpload,
  delteMessage,
}: Props) => {
  const [prevSelectId, setPrevSelectId] = useState(-1)
  const [currentSelectId, setCurrentSelectId] = useState(-1)

  const handleMoreView = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      const currentId = parseInt((e.target as HTMLElement).id, 10)
      if (currentId !== prevSelectId) {
        setCurrentSelectId(currentId)
        setPrevSelectId(currentId)
      }

      if (currentId === prevSelectId) {
        setCurrentSelectId(-1)
        setPrevSelectId(-1)
      }
    },
    [prevSelectId, currentSelectId],
  )

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
            autoFocus={true}
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
          <TextareaWrapper>
            <LabelStyled htmlFor="textarea">메세지</LabelStyled>
            <Textarea
              id="textarea"
              name="presentMessage"
              value={content}
              onChange={handleInput}
              style={{ height: '120px' }}
            />
            <Text size="MICRO" color="TEXT_GRAY_DARK" style={{ padding: 8 }}>
              {content?.length} / 150
            </Text>
            <PlusButton aria-label="add" onClick={onCilckMessage}>
              <AddIcon />
            </PlusButton>
          </TextareaWrapper>
        </Div>
        <Wrapper>
          {contentList.map(({ content, MessageId }, index) => (
            <TextItem key={index}>
              <Text
                id={String(index)}
                size="SMALL"
                style={{
                  marginRight: 'auto',
                  width: '80%',
                  lineHeight: 1.3,
                  wordWrap: 'break-word',
                }}>
                {content && content.length > 16 && currentSelectId !== index
                  ? `${content.substring(0, 16)}...`
                  : content}
              </Text>
              {content && content.length > 16 && (
                <MUIButton
                  id={String(index)}
                  onClick={handleMoreView}
                  style={{
                    width: 30,
                    border: 'none',
                    fontSize: FONT_SIZES.MICRO,
                    padding: 0,
                    margin: 0,
                    color: COLORS.RED,
                    background: 'none',
                    alignSelf: 'flex-end',
                  }}>
                  {currentSelectId === index ? '숨기기' : '더보기'}
                </MUIButton>
              )}
              <Icon
                name="close"
                color="TEXT_GRAY_DARK"
                size="MEDIUM"
                onIconClick={() => delteMessage(MessageId)}
              />
            </TextItem>
          ))}
        </Wrapper>
      </PresentModalContainer>
    </>
  )
}

const Wrapper = styled.div`
  border-top: 1px solid ${COLORS.WHITE};
  margin-top: 16px;
`

const TextItem = styled.div`
  display: flex;
  border-bottom: 1px solid ${COLORS.TEXT_GRAY_DARK};
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
`

// const TextStyle: React.CSSProperties = {
//   padding: '12px 0 12px 12px',
//   textOverflow: 'ellipsis',
//   overflow: 'hidden',
//   whiteSpace: 'nowrap',
//   width: '100%',
// }

// const TextMoreStyle: React.CSSProperties = {
//   padding: '12px 0 12px 12px',
//   lineHeight: '1.5',
//   wordBreak: 'break-all',
//   whiteSpace: 'pre-wrap',
//   width: '100%',
// }

const PresentModalContainer = styled.div`
  height: 100%;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
const Div = styled.div`
  margin-top: 5%;
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

const LabelStyled = styled.label`
  width: 100%;
  padding: 8px;
  text-align: center;
  display: inline-block;
`
const TextareaWrapper = styled.div`
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
`

const PlusButton = styled(Fab)(() => ({
  position: 'absolute',
  bottom: '5px',
  right: '5px',
  height: '40px',
  width: '40px',
  color: 'white',
  backgroundColor: COLORS.RED,
  '&:hover': { backgroundColor: COLORS.RED, filter: 'brightness(0.9)' },
}))

export default PresentModal
