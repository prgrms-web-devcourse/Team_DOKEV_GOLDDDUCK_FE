import {
  IFilteredEventItem,
  IEventList,
  IPagination,
  IEventItem,
  IWinnerList,
  IWinner,
  IFilteredWinnerList,
} from 'types/event'

export const filteredEventList = ({
  pagination,
  simpleEventList,
}: IEventList): [IPagination, IFilteredEventItem[]] | undefined => {
  return [
    pagination,
    simpleEventList?.map(
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
  ]
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
  winnerList: IWinnerList[],
): IFilteredWinnerList[] | undefined => {
  return winnerList?.map(({ category, winners }: IWinnerList) => {
    return {
      category,
      winners: winners?.map(({ id, name }: IWinner) => {
        return {
          _id: String(id),
          name,
        }
      }),
    }
  })
}
