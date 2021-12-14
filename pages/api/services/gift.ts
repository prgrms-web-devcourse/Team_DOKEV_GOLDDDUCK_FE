import { IFilteredGiftItem, IGiftList, IPagination } from 'types/gift'

export const filteredGiftList = ({
  pagination,
  giftItemList,
}: IGiftList): [IPagination, Array<IFilteredGiftItem>] | undefined => {
  return [
    pagination,
    giftItemList?.map(({ content, giftType, id, used, mainTemplate }) => {
      return {
        _id: id.toString(),
        giftType,
        template: mainTemplate,
        used,
        src: giftType === 'IMAGE' ? content : '',
        message: giftType === 'IMAGE' ? '' : content,
      }
    }),
  ]
}
