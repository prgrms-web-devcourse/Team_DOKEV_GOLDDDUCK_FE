import Text from '@components/Text'
import Icon from '@components/Icon'
import MUIButton from '@components/MUIButton'
import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'
import { EVENT_STATUS, EVENT_TEMPLATE, EVENT_TYPE } from 'types/event'

interface ICover {
  mainTemplate: EVENT_TEMPLATE
  title: string
  status: EVENT_STATUS
  type: EVENT_TYPE
  code: string
}

const Cover = ({
  mainTemplate,
  title,
  status,
  type,
  code,
}: ICover): JSX.Element => {
  const EVENT_LINK = `http://localhost:3000/${type.toLowerCase()}/${code}`

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(EVENT_LINK)
  }

  return (
    <Wrapper
      style={{
        backgroundImage: `url(/cover/cover${mainTemplate}.png)`,
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
        {`${type === 'FIFO' ? '#선착순' : '#랜덤'} ${
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
          onIconClick={() => {
            confirm(
              '이벤트를 삭제하시겠습니까?\n삭제한 이벤트는 종료 처리되고 더 이상 확인할 수 없습니다.',
            ) && alert('삭제되었습니다')
          }}
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
