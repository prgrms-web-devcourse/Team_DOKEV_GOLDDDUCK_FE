import Checkbox from '@components/Checkbox'
import CheckboxList from '@domains/CheckboxList'
import Text from '@components/Text'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN, FONT_SIZES } from '@utils/constants/sizes'
import { useCallback, useEffect, useState } from 'react'
import { EVENT_FILTER, IFilteredEventItem } from 'types/event'
import { useRouter } from 'next/router'
import Spinner from '@components/Spinner'
import { COLORS } from '@utils/constants/colors'

interface IProps {
  filteredEvents: IFilteredEventItem[]
  onClick: React.MouseEventHandler<HTMLElement>
  isLoading: boolean
}

const EventList = ({
  filteredEvents,
  onClick,
  isLoading,
}: IProps): JSX.Element => {
  const route = useRouter()
  const [filter, setFilter] = useState<EVENT_FILTER>('ALL')
  const [selectedChip, setSelectedChip] = useState(
    filter === 'CLOSED'
      ? 3
      : filter === 'RUNNING'
      ? 2
      : filter === 'READY'
      ? 1
      : 0,
  )

  const handleFilterClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      const element = e.target as HTMLElement
      setFilter(element.id.toUpperCase() as EVENT_FILTER)
      onClick?.(e)
    },
    [onClick],
  )

  useEffect(() => {
    setSelectedChip(
      filter === 'CLOSED'
        ? 3
        : filter === 'RUNNING'
        ? 2
        : filter === 'READY'
        ? 1
        : 0,
    )
  }, [filter])

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
                  key={_id}
                  onClick={() => code && route.push(`/event/${code}`)}
                  style={{
                    backgroundImage: `url(/templates/${template}.png)`,
                  }}>
                  {title}
                </ItemWrapper>
              )
            })
          ) : (
            <Text color="WHITE">텅</Text>
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
