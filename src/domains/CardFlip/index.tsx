import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import Image from '@components/Image'
import { COLORS } from '@utils/constants/colors'
import MUIButton from '@components/MUIButton'
import { keyframes } from '@emotion/react'
import { ADD_GIFT_TYPE } from 'types/gift'
import Text from '@components/Text'
import html2canvas from 'html2canvas'

interface ICardFlip {
  front: JSX.Element
  url: string
  type: ADD_GIFT_TYPE
}

const CardFlip = ({ front, url, type }: ICardFlip): JSX.Element => {
  const [flip, setFlip] = useState(true)
  const saveTarget = useRef(null)

  const handleCardFlip = () => {
    setFlip((prev) => !prev)
  }

  // download html as png
  const onCapture = () => {
    saveTarget.current &&
      html2canvas(saveTarget?.current as HTMLElement).then((canvas) => {
        onSaveAs(canvas.toDataURL('image/png'), `my_gift_${type}.png`)
      })

    const onSaveAs = (uri: string, filename: string) => {
      const link = document.createElement('a')
      document.body.appendChild(link)
      link.href = uri
      link.download = filename
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <CardContainer>
      <div
        ref={saveTarget}
        onClick={handleCardFlip}
        style={{
          backfaceVisibility: 'hidden',
          transform: `rotateY(${flip ? 1620 : 0}deg)`,
          transition: 'ease-out 1.6s',
          position: 'absolute',
          margin: '0 auto',
          width: '100%',
        }}>
        {front}
      </div>
      <div
        onClick={handleCardFlip}
        style={{
          backfaceVisibility: 'hidden',
          transform: `rotateY(${flip ? 0 : -1620}deg)`,
          transition: 'ease-out 1.6s',
          position: 'absolute',
        }}>
        <Image
          src={type === 'BOOM' ? '/card1.png' : '/card.jpg'}
          width="100%"
          height="420px"
          mode="fill"
          style={{ margin: '0 auto', borderRadius: '8px' }}
        />
      </div>
      <FadeInWrapper
        onClick={() => (type === 'TEXT' || type === 'BOOM') && onCapture()}
        style={{ display: flip ? 'none' : 'block' }}>
        {type === 'IMAGE' ? (
          <a href={url} download>
            <MUIButton style={{ ...BtnStyle }}>
              <Text color="WHITE" size="BASE">
                선물 저장
              </Text>
            </MUIButton>
          </a>
        ) : (
          <MUIButton style={{ ...BtnStyle }}>
            <Text color="WHITE" size="BASE">
              선물 저장
            </Text>
          </MUIButton>
        )}
      </FadeInWrapper>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  position: relative;
  perspective: 1000px;
  width: 80%;
  height: 60%;
  margin: 0 auto;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`
const FadeInWrapper = styled.div`
  animation: ${fadeIn} 3s ease-out;
`

const BtnStyle: React.CSSProperties = {
  width: '30%',
  borderRadius: '50px',
  position: 'absolute',
  left: '50%',
  bottom: '-25%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: COLORS.RED,
}

export default CardFlip
