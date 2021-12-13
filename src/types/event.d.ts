export declare type EVENT_TEMPLATE =
  | 'template1'
  | 'template2'
  | 'template3'
  | 'template4'
  | 'template5'
  | 'template6'
export declare type EVENT_STATUS = 'READY' | 'RUNNING' | 'CLOSED'
export declare type EVENT_TYPE = 'FIFO' | 'RANDOM'

export interface IEventList {
  pagination: {
    currentPage: number
    offset: number
    size: number
    totalElements: number
    totalPages: number
  }
  simpleEventList: Array<IEventItem>
}
export interface IEventItem {
  code: string
  createdAt: string
  endAt: string
  eventId: number
  eventProgressStatus: EVENT_STATUS
  giftChoiceType: EVENT_TYPE
  mainTemplate: EVENT_TEMPLATE
  maxParticipantCount: number
  startAt: string
  title: string
}
