import CheckboxList from '@domains/CheckboxList'
import { useCallback, useEffect, useState } from 'react'
import { GIFT_FILTER } from 'types/gift'

interface IFilterChips {
  children: React.ReactNode
  filter?: GIFT_FILTER
  onClick: (e: string) => void
  style?: React.CSSProperties
}

const FilterChips = ({
  children,
  filter,
  onClick,
  style,
}: IFilterChips): JSX.Element => {
  const [selectedChip, setSelectedChip] = useState(
    filter === 'USED' ? 2 : filter === 'UN_USED' ? 1 : 0,
  )
  console.log(filter, selectedChip)
  const handleChangeChip = useCallback(
    (id: string) => {
      onClick?.(id)
    },
    [onClick],
  )

  useEffect(() => {
    filter &&
      setSelectedChip(filter === 'USED' ? 2 : filter === 'UN_USED' ? 1 : 0)
  }, [filter])

  return (
    <CheckboxList
      selectedIndex={selectedChip}
      onClick={handleChangeChip}
      style={{ ...style }}>
      {children}
    </CheckboxList>
  )
}

export default FilterChips
