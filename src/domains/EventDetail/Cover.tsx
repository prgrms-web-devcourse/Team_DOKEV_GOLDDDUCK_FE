import Text from '@components/Text'
import Icon from '@components/Icon'
import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import { EVENT_FILTER, EVENT_TEMPLATE, EVENT_TYPE } from 'types/event'
import { useCallback } from 'react'
interface ICover {
  template: EVENT_TEMPLATE
  title: string
  status: EVENT_FILTER
  eventType: EVENT_TYPE
  code: string
  id: string
}

const Cover = ({
  template,
  title,
  status,
  eventType,
  code,
  id,
}: ICover): JSX.Element => {
  const EVENT_LINK = `http://localhost:3000/${eventType?.toLowerCase()}/${code}`
  const TEMPLATE_IMAGE = template && `/templates/${template}.png`

  const handleCopyUrl = useCallback(() => {
    navigator.clipboard.writeText(EVENT_LINK)
  }, [EVENT_LINK])

  const handleClickRemove = (): void => {
    console.log(id)
  }

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${TEMPLATE_IMAGE})`,
      }}>
      <Text
        color="BLACK"
        size="LARGE"
        style={{
          textAlign: 'center',
          wordBreak: 'keep-all',
          lineHeight: '1.5',
        }}>
        {title}
      </Text>
      <MUIButton onClick={handleCopyUrl} style={{ ...copyBtnStyle }}>
        링크 복사
      </MUIButton>
      <Text color="TEXT_GRAY_DARK">
        {`${eventType === 'FIFO' ? '#선착순' : '#랜덤'} ${
          status === 'READY'
            ? '#준비중'
            : status === 'RUNNING'
            ? '#진행중'
            : '#종료됨'
        }`}
      </Text>
      <RemoveButton>
        <Icon
          name="remove"
          size="LARGE"
          style={{ margin: '16px 0 0 16px' }}
          onIconClick={handleClickRemove}
        />
      </RemoveButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 70%;
  padding: 40px;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-size: cover;
`

const RemoveButton = styled.div`
  position: absolute;
  bottom: -1px;
  right: -1px;
  background-color: ${COLORS.BLACK};
  border-radius: 50px 0 0 0;
`

const copyBtnStyle: React.CSSProperties = {
  backgroundColor: COLORS.RED,
  borderRadius: 20,
  lineHeight: 2,
}

export default Cover
