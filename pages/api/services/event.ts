import {
  IFilteredEventItem,
  IEventList,
  IEventItem,
  IWinners,
  IFilteredWinners,
} from 'types/event'

export const filteredEventList = ({
  pagination,
  simpleEventList,
}: IEventList): { totalPages: number; eventList: IFilteredEventItem[] } => {
  return {
    totalPages: pagination?.totalPages,
    eventList: simpleEventList?.map(
      ({
        code,
        endAt,
        eventId,
        eventProgressStatus,
        giftChoiceType,
        mainTemplate,
        startAt,
        title,
      }) => {
        return {
          code,
          _id: eventId.toString(),
          start: startAt,
          end: endAt,
          status: eventProgressStatus,
          eventType: giftChoiceType,
          template: mainTemplate,
          title,
        }
      },
    ),
  }
}

export const eventDetail = ({
  code,
  endAt,
  eventId,
  eventProgressStatus,
  giftChoiceType,
  mainTemplate,
  startAt,
  title,
}: IEventItem): IFilteredEventItem | undefined => {
  return {
    code,
    _id: eventId.toString(),
    start: startAt,
    end: endAt,
    status: eventProgressStatus,
    eventType: giftChoiceType,
    template: mainTemplate,
    title,
  }
}

export const eventWinnerList = (
  winnerList: IWinners[],
): IFilteredWinners[] | undefined => {
  return winnerList?.map(({ category, winners }: IWinners) => {
    return {
      category,
      winners: {
        _id: winners.id?.toString(),
        name: winners.name,
      },
    }
  })
}
