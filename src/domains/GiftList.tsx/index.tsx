import Checkbox from '@components/Checkbox'
import CheckboxList from '@domains/CheckboxList'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { GIFT_FILTER, IGiftList } from 'types/gift'

const END_POINT = 'http://maenguin.iptime.org:8080'

const GiftList = (): JSX.Element => {
  const [filter, setFilter] = useState<GIFT_FILTER>('ALL')
  const [selectedChip, setSelectedChip] = useState(
    filter === 'USED' ? 2 : filter === 'UN_USED' ? 1 : 0,
  )

  // const handleClick = useCallback(
  //   (e: React.MouseEvent<HTMLInputElement>) => {
  //     const element = e.target as HTMLElement
  //     setFilter(element.id.toUpperCase() as GIFT_FILTER)
  //     onClick?.(e)
  //   },
  //   [onClick],
  // )

  const handleFilterClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      const element = e.target as HTMLElement
      setFilter(element.id.toUpperCase() as GIFT_FILTER)
      try {
        axios
          .get(
            `${END_POINT}${`/api/v1/members/1/gifts?used=${
              element.id === 'used' ? true : 'un_used' ? false : null
            }&page=0&size=4`}`,
            {
              headers: {
                'X-GOLDDDUCK-AUTH':
                  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiZG9rZXYiLCJleHAiOjE2Mzk1ODkxNDgsImlhdCI6MTYzOTQxNjM0OCwidXNlcklkIjo2LCJ1c2VybmFtZSI6IuuPhOqwgOyYgSJ9.zTnvofVUculDdRdOH5jQ6iPfUWUIxq9XmdpSgHP5w44Amp4tbIuGoqsjsi9u7OPFrN6vBUh_1QIvnDpCpc83mw',
              },
            },
          )
          .then((res) => res.data.data)
          .then(({ pagination, giftItemList }: IGiftList) => {
            console.log(pagination, giftItemList)
          })
      } catch (e) {
        console.error(e)
      }
    },
    [],
  )

  useEffect(() => {
    filter &&
      setSelectedChip(filter === 'USED' ? 2 : filter === 'UN_USED' ? 1 : 0)
  }, [filter])

  return (
    <CheckboxList onClick={handleFilterClick} selectedIndex={selectedChip}>
      <Checkbox onClick={handleFilterClick} name="전체" id="all" />
      <Checkbox onClick={handleFilterClick} name="미사용" id="un_used" />
      <Checkbox onClick={handleFilterClick} name="사용완료" id="used" />
    </CheckboxList>
  )
}

export default GiftList
