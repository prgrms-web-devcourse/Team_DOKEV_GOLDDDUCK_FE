import Checkbox from '@components/Checkbox'
import CheckboxList from '@domains/CheckboxList'
import Text from '@components/Text'
import styled from '@emotion/styled'
import { DEFAULT_MARGIN } from '@utils/constants/sizes'
import { useCallback, useEffect, useState } from 'react'
import { EVENT_FILTER, IFilteredEventItem } from 'types/event'
import { useRouter } from 'next/router'
import Spinner from '@components/Spinner'

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

  const handleMoveToDetail = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    const element = e.target as HTMLElement
    route.push(`/event/${element.offsetParent?.getAttribute('id')}`)
  }

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
                  id={code}
                  onClick={handleMoveToDetail}
                  style={{
                    backgroundImage: `url(/templates/${template}.png)`,
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
  justify-content: space-between;
  flex-wrap: wrap;
  margin: ${DEFAULT_MARGIN} 0;
`

const ItemWrapper = styled.div`
  position: relative;
  width: calc(50% - 8px);
  border-radius: 8;
  cursor: pointer;
`

export default EventList
