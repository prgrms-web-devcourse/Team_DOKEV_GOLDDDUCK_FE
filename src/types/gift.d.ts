export type GIFT_TYPE = 'IMAGE' | 'TEXT' | 'URL'
export type GIFT_FILTER = 'ALL' | 'USED' | 'UN_USED'
export interface IGiftItem {
  category: string
  content: string
  giftType: GIFT_TYPE
  id: number
  used: boolean
  mainTemplate: string
}

export interface IFilteredGiftItem {
  _id: string
  giftType: GIFT_TYPE
  category: string
  used: boolean
  src: string
  message: string
  template: string
}

export interface IPagination {
  currentPage: number
  offset: number
  size: number
  totalElements: number
  totalPages: number
}

export interface IGiftList {
  pagination: IPagination
  giftItemList: Array<IGiftItem>
}
