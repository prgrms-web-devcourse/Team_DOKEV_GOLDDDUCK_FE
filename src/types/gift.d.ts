export type GIFT_TYPE = 'IMAGE' | 'TEXT' | 'URL'
export type GIFT_FILTER = 'ALL' | 'USED' | 'UN_USED'

// api로 부터 받아오는 선물 전체 목록 데이터 중 선물 단건
export interface IGiftItem {
  category: string
  content: string
  giftType: GIFT_TYPE
  id: number
  used: boolean
  mainTemplate: string
  sender: string
}

// 받아온 선물 단건에 대한 정제된 데이터
export interface IFilteredGiftItem {
  _id: string
  giftType: GIFT_TYPE
  category: string
  used: boolean
  src: string
  message: string
  template: string
  sender: string
}

// api 로 부터 받아오는 페이징
export interface IPagination {
  currentPage: number
  offset: number
  size: number
  totalElements: number
  totalPages: number
}

// api로부터 받아오는 선물 전체 목록
export interface IGiftList {
  pagination: IPagination
  giftItemList: IGiftItem[]
}

// api로부터 받아오는 선물 단건
export interface IGiftDetail extends IGiftItem {
  receivedDate: string
}

// 받아온 선물 단건에 대한 정제된 데이터
export interface IFilteredGiftDetail extends IFilteredGiftItem {
  receivedDate: string
}
