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
            <LabelStyled htmlFor="textarea">메시지</LabelStyled>
            <Textarea
              id="textarea"
              name="presentMessage"
              value={content}
              onChange={handleInput}
              style={{ height: '120px' }}
            />
            <PlusButton aria-label="add" onClick={onCilckMessage}>
              <AddIcon />
            </PlusButton>
          </TextareaWrapper>
        </Div>
        <Wrapper>
          {contentList.map(({ content }, index) => (
            <TextItem key={index}>
              <Text
                id={String(index)}
                size="SMALL"
                style={
                  currentSelectId === index
                    ? { ...TextMoreStyle }
                    : { ...TextStyle }
                }>
                {content}
              </Text>
              <MUIButton
                id={String(index)}
                onClick={handleMoreView}
                style={{
                  border: 'none',
                  background: 'none',
                  whiteSpace: 'normal',
                  fontSize: FONT_SIZES.MICRO,
                  padding: 0,
                  color: 'red',
                }}>
                {currentSelectId === index ? '숨기기' : '더보기'}
              </MUIButton>
              <Icon
                name="close"
                color="TEXT_GRAY_DARK"
                size="LARGE"
                style={{ width: '40px' }}
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
  margin-top: 5%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const TextItem = styled.div`
  display: flex;
  border-top: 1px solid ${COLORS.TEXT_GRAY_DARK};
  &:first-of-type {
    border: none;
  }
`

const TextStyle: React.CSSProperties = {
  padding: '12px 0 12px 12px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
}

const TextMoreStyle: React.CSSProperties = {
  padding: '12px 0 12px 12px',
  lineHeight: '1.5',
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
  width: '100%',
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
  font-size: 1.2rem;
  width: 100%;
  padding: 8px;
  text-align: center;
  display: inline-block;
`
const TextareaWrapper = styled.div`
  width: 98%;
  margin: 0 auto;
  margin-top: 16px;
  background-color: #ffffff;
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
