import Text from '@components/Text'
import Icon from '@components/Icon'
import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import { EVENT_FILTER, EVENT_TEMPLATE, EVENT_TYPE } from 'types/event'
import { useCallback } from 'react'
import RemoveAlert from '@components/Swalert/RemoveAlert'
import alertImage from '/public/alert.png'
interface ICover {
  template: EVENT_TEMPLATE
  title: string
  status: EVENT_FILTER
  eventType: EVENT_TYPE
  code: string
  onRemoveEvent: React.MouseEventHandler<SVGElement>
}

const Cover = ({
  template,
  title,
  status,
  eventType,
  code,
  onRemoveEvent,
}: ICover): JSX.Element => {
  const EVENT_LINK = `${
    window.location.host
  }/${eventType?.toLowerCase()}/${code}`
  const TEMPLATE_IMAGE = template && `/templates/${template}.png`

  const handleCopyUrl = useCallback(() => {
    navigator.clipboard.writeText(EVENT_LINK)
  }, [EVENT_LINK])

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
        {`${eventType === 'FIFO' ? '#눈치게임' : '#랜덤박스'} ${
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
          onIconClick={() =>
            RemoveAlert(onRemoveEvent, alertImage.src, '삭제', '취소')
          }
        />
      </RemoveButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 240px;
  min-height: 340px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 70px 30px;
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
