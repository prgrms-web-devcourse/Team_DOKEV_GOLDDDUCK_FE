import { IFilteredEventItem, IEventList, IPagination } from 'types/event'

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
