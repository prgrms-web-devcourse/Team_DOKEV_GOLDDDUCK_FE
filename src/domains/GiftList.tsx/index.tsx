import Checkbox from '@components/Checkbox'
import CheckboxList from '@domains/CheckboxList'
import Image from '@components/Image'
import Text from '@components/Text'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { useCallback, useEffect, useState } from 'react'
import { GIFT_FILTER, IFilteredGiftItem } from 'types/gift'
import { useRouter } from 'next/router'
import used_mark from '/src/assets/used_mark.png'

interface IProps {
  filteredGifts: IFilteredGiftItem[]
  onClick: React.MouseEventHandler<HTMLElement>
}

const GiftList = ({ filteredGifts, onClick }: IProps): JSX.Element => {
  const [filter, setFilter] = useState<GIFT_FILTER>('ALL')
  const [selectedChip, setSelectedChip] = useState(
    filter === 'USED' ? 2 : filter === 'UN_USED' ? 1 : 0,
  )
  // const [filteredGiftList, setFilteredGiftList] = useState(initialState)

  const handleFilterClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      const element = e.target as HTMLElement
      setFilter(element.id.toUpperCase() as GIFT_FILTER)
      onClick?.(e)
    },
    [onClick],
  )

  useEffect(() => {
    setSelectedChip(filter === 'USED' ? 2 : filter === 'UN_USED' ? 1 : 0)
  }, [filter])

  const handleMoveToDetail = (e: React.MouseEvent<HTMLDivElement>): void => {
    const element = e.target as HTMLElement
    useRouter().push(`/gift/${element.id}`)
  }

  return (
    <>
      <CheckboxList onClick={handleFilterClick} selectedIndex={selectedChip}>
        <Checkbox onClick={handleFilterClick} name="전체" id="all" />
        <Checkbox onClick={handleFilterClick} name="미사용" id="un_used" />
        <Checkbox onClick={handleFilterClick} name="사용완료" id="used" />
      </CheckboxList>
      <ListWrapper>
        {filteredGifts?.length ? (
          filteredGifts.map(
            ({ _id, giftType, src, message, used, template }) => {
              return (
                <ItemWrapper key={_id} id={_id} onClick={handleMoveToDetail}>
                  <Image
                    src={used_mark.src}
                    style={{
                      display: used ? 'block' : 'none',
                      ...markImageStyle,
                    }}
                  />
                  {giftType === 'IMAGE' ? (
                    <Image
                      src={src}
                      style={{ opacity: used ? 0.2 : 1, ...imageItemStyle }}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundImage: `url(/templates/${template}.png)`,
                        opacity: used ? 0.2 : 1,
                        ...textItemStyle,
                      }}>
                      <Text
                        size="BASE"
                        color="BLACK"
                        style={{
                          ...itemTextStyle,
                        }}>
                        {message}
                      </Text>
                    </div>
                  )}
                </ItemWrapper>
              )
            },
          )
        ) : (
          <Text>텅</Text>
        )}
      </ListWrapper>
    </>
  )
}

const ListWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${DEFAULT_MARGIN};
  margin: ${DEFAULT_MARGIN} 0;
`

const ItemWrapper = styled.div`
  position: relative;
  width: calc(50% - 8px);
  height: 240px;
  border-radius: 8;
`

const markImageStyle: React.CSSProperties = {
  position: 'absolute',
  top: '24%',
  left: '16%',
  width: '120px',
  height: '120px',
}

const imageItemStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 8,
}

const textItemStyle: React.CSSProperties = {
  height: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  wordBreak: 'keep-all',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  padding: DEFAULT_MARGIN,
}

const itemTextStyle: React.CSSProperties = {
  height: '4.2em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: '1.4em',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  textAlign: 'center',
}

export default GiftList
