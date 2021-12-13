import Image from '@components/Image'
import Text from '@components/Text'
import { GIFT_TYPE } from 'types/gift'

interface IGiftCard {
  giftType: GIFT_TYPE
  content: string
  template: string //event_template으로 변경 필요
}

const GiftCard = ({ giftType, content, template }: IGiftCard): JSX.Element => {
  return (
    <>
      {giftType === 'IMAGE' ? (
        <Image src={content} />
      ) : (
        <Text
          color="BLACK"
          size="BASE"
          style={{
            backgroundImage: `url(cover/${template}.png`,
            textAlign: 'center',
            wordBreak: 'keep-all',
            lineHeight: '1.5',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
          {content}
        </Text>
      )}
    </>
  )
}

export default GiftCard
