import { IFilteredGiftItem, IGiftList, IPagination } from 'types/gift'

export const filteredGiftList = ({
  pagination,
  giftItemList,
}: IGiftList): [IPagination, IFilteredGiftItem[]] | undefined => {
  return [
    pagination,
    giftItemList?.map(
      ({ content, giftType, category, id, used, mainTemplate }) => {
        return {
          _id: id.toString(),
          giftType,
          category,
          template: mainTemplate,
          used,
          src: giftType === 'IMAGE' ? content : '',
          message: giftType === 'IMAGE' ? '' : content,
        }
      },
    ),
  ]
}
