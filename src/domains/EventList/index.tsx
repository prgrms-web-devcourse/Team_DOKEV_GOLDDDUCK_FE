import Checkbox from '@components/Checkbox'
import CheckboxList from '@domains/CheckboxList'
import Image from '@components/Image'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN, FONT_SIZES } from '@utils/constants/sizes'
import { useCallback, useEffect, useState } from 'react'
import { IFilteredEventItem } from 'types/event'
import { NextRouter, useRouter } from 'next/router'
import Spinner from '@components/Spinner'
import { COLORS } from '@utils/constants/colors'
import EMPTY_IMAGE from '/public/empty.png'

interface IProps {
  filteredEvents: IFilteredEventItem[]
  onClick: React.MouseEventHandler<HTMLElement>
  isLoading: boolean
}

const currentChip = (router: NextRouter) => {
  switch (router.query?.filter) {
    case 'closed':
      return 3
    case 'running':
      return 2
    case 'ready':
      return 1
    default:
      return 0
  }
}

const EventList = ({
  filteredEvents,
  onClick,
  isLoading,
}: IProps): JSX.Element => {
  const router = useRouter()
  const [selectedChip, setSelectedChip] = useState(currentChip(router))
  const handleFilterClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      onClick?.(e)
    },
    [onClick],
  )

  useEffect(() => {
    setSelectedChip(currentChip(router))
  }, [router.query?.filter])

  return (
    <>
      <CheckboxList onClick={handleFilterClick} selectedIndex={selectedChip}>
        <Checkbox onClick={handleFilterClick} name="전체" id="all" />
        <Checkbox onClick={handleFilterClick} name="대기중" id="ready" />
        <Checkbox onClick={handleFilterClick} name="진행중" id="running" />
        <Checkbox onClick={handleFilterClick} name="종료됨" id="closed" />
      </CheckboxList>

      {!isLoading ? (
        <ListWrapper>
          {filteredEvents?.length ? (
            filteredEvents.map(({ code, _id, template, title }) => {
              return (
                <ItemWrapper
                  key={`event${_id}`}
                  onClick={() => code && router.push(`/event/${code}`)}
                  style={{
                    backgroundImage: `url(/templates/${template}.png)`,
                  }}>
                  {title}
                </ItemWrapper>
              )
            })
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
  display: flex;
  flex-wrap: wrap;
  width: 332px;
  margin: ${DEFAULT_MARGIN} auto;
`

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 210px;
  line-height: 1.5;
  padding: ${DEFAULT_MARGIN};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  cursor: pointer;
  margin: 8px;
  text-align: center;
  word-break: keep-all;
  color: ${COLORS.BLACK};
  font-size: ${FONT_SIZES.BASE};
`

export default EventList
