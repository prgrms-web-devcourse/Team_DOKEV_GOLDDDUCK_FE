export declare type EVENT_TEMPLATE =
  | 'template1'
  | 'template2'
  | 'template3'
  | 'template4'
  | 'template5'
  | 'template6'
export declare type EVENT_TYPE = 'FIFO' | 'RANDOM'
export declare type EVENT_FILTER = 'ALL' | 'READY' | 'RUNNING' | 'CLOSED'
export interface IEventList {
  pagination: IPagination
  simpleEventList: IEventItem[]
}
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

export interface IPagination {
  currentPage: number
  offset: number
  size: number
  totalElements: number
  totalPages: number
}
