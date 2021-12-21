import Checkbox from '@components/Checkbox'
import CheckboxList from '@domains/CheckboxList'
import Image from '@components/Image'
import Text from '@components/Text'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { useCallback, useEffect, useState } from 'react'
import { IFilteredGiftItem } from 'types/gift'
import { useRouter } from 'next/router'
import used_mark from '/src/assets/used_mark.png'
import Spinner from '@components/Spinner'
import EMPTY_IMAGE from '/public/empty.png'

interface IProps {
  filteredGifts: IFilteredGiftItem[]
  onClick: React.MouseEventHandler<HTMLElement>
  isLoading: boolean
}

const GiftList = ({
  filteredGifts,
  onClick,
  isLoading,
}: IProps): JSX.Element => {
  const router = useRouter()
  const [selectedChip, setSelectedChip] = useState(
    router.query?.filter === 'used'
      ? 2
      : router.query?.filter === 'un_used'
      ? 1
      : 0,
  )

  const handleFilterClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      onClick?.(e)
    },
    [onClick],
  )

  useEffect(() => {
    setSelectedChip(
      router.query?.filter === 'used'
        ? 2
        : router.query?.filter === 'un_used'
        ? 1
        : 0,
    )
  }, [router.query?.filter])

  return (
    <>
      <CheckboxList onClick={handleFilterClick} selectedIndex={selectedChip}>
        <Checkbox onClick={handleFilterClick} name="전체" id="all" />
        <Checkbox onClick={handleFilterClick} name="미사용" id="un_used" />
        <Checkbox onClick={handleFilterClick} name="사용완료" id="used" />
      </CheckboxList>

      {!isLoading ? (
        <ListWrapper>
          {filteredGifts?.length ? (
            filteredGifts.map(
              ({
                _id,
                giftType,
                category,
                src,
                message,
                used,
                template,
                sender,
              }) => {
                return (
                  <ItemWrapper
                    key={`gift${_id}`}
                    id={_id}
                    onClick={() => router.push(`/gift/${_id}`)}>
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
                    <Text
                      size="SMALL"
                      color="WHITE"
                      style={{ margin: '8px 0 0 4px' }}>
                      {category}
                    </Text>
                    <Text
                      size="MICRO"
                      color="TEXT_GRAY_LIGHT"
                      style={{ margin: '4px 16px 16px 4px' }}>
                      from.{sender}
                    </Text>
                  </ItemWrapper>
                )
              },
            )
          ) : (
            <Image src={EMPTY_IMAGE.src} width="100%" height="100%" />
          )}
        </ListWrapper>
      ) : (
        <div style={{ display: 'flex', alignItems: '', textAlign: 'center' }}>
          <Spinner />
        </div>
      )}
    </>
  )
}

const ListWrapper = styled.section`
  width: 332px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: ${DEFAULT_MARGIN} auto;
  user-select: none;
`

const ItemWrapper = styled.div`
  position: relative;
  width: calc(50% - 8px);
  border-radius: 8;
  cursor: pointer;
`

const markImageStyle: React.CSSProperties = {
  position: 'absolute',
  top: 45,
  left: 15,
  width: '120px',
  height: '120px',
}

const imageItemStyle: React.CSSProperties = {
  width: 150,
  height: 210,
  objectFit: 'cover',
  borderRadius: 8,
}

const textItemStyle: React.CSSProperties = {
  width: 150,
  height: 210,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  wordBreak: 'keep-all',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  padding: DEFAULT_MARGIN,
  backgroundPosition: 'center',
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
