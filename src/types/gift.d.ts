export type GIFT_TYPE = 'IMAGE' | 'TEXT' | 'URL'
export type GIFT_FILTER = 'ALL' | 'USED' | 'UN_USED'
export interface IGiftItem {
  content: string
  giftType: GIFT_TYPE
  id: number
  used: boolean
}

export interface IGiftList {
  pagination: {
    currentPage: number
    offset: number
    size: number
    totalElements: number
    totalPages: number
  }
  giftItemList: Array<IGiftItem>
}
