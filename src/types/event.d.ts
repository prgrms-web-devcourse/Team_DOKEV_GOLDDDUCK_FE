export declare type EVENT_TEMPLATE =
  | 'template1'
  | 'template2'
  | 'template3'
  | 'template4'
  | 'template5'
  | 'template6'
export declare type EVENT_TYPE = 'FIFO' | 'RANDOM'
export declare type EVENT_FILTER = 'ALL' | 'READY' | 'RUNNING' | 'CLOSED'

// api 요청으로 받아오는 이벤트 전체 목록
export interface IEventList {
  pagination: IPagination
  simpleEventList: IEventItem[]
}

// api 요청으로 받아오는 이벤트 단건
export interface IEventItem {
  code: string
  createdAt: string
  endAt: string
  eventId: number
  eventProgressStatus: EVENT_FILTER
  giftChoiceType: EVENT_TYPE
  mainTemplate: EVENT_TEMPLATE
  maxParticipantCount: number
  startAt: string
  title: string
}

// 받아온 이벤트 단건에 대한 정제 데이터
export interface IFilteredEventItem {
  code: string
  _id: string
  start: string
  end: string
  status: EVENT_FILTER
  eventType: EVENT_TYPE
  template: EVENT_TEMPLATE
  title: string
}

// api 요청으로 받아오는 페이징 데이터
export interface IPagination {
  currentPage: number
  offset: number
  size: number
  totalElements: number
  totalPages: number
}

// api 요청으로 받아오는 이벤트 당첨자 목록
export interface IWinners {
  category: string
  winners: {
    id: number
    name: string
  }
}

// 받아온 이벤트 당첨자 목록에 대한 정제 데이터
export interface IFilteredWinners {
  category: string
  winners: {
    _id: string
    name: string
  }
}
