import Checkbox from '@components/Checkbox'
import { useCallback, useState } from 'react'
import { GIFT_FILTER } from 'types/gift'
import FilterChips from './FilterChips'

interface IGiftList {
  onClick: (e: string) => void
}

const GiftList = ({ onClick }: IGiftList): JSX.Element => {
  const [filter, setFilter] = useState('ALL')

  console.error(filter)
  const handleClick = useCallback(
    (id: string) => {
      setFilter(id.toUpperCase())
      onClick?.(id)
    },
    [onClick],
  )

  return (
    <FilterChips filter={filter as GIFT_FILTER} onClick={handleClick}>
      <Checkbox onClick={handleClick} name="전체" id="all" />
      <Checkbox onClick={handleClick} name="미사용" id="un_used" />
      <Checkbox onClick={handleClick} name="사용완료" id="used" />
    </FilterChips>
  )
}

export default GiftList
