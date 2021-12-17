import {
  IFilteredGiftDetail,
  IFilteredGiftItem,
  IGiftDetail,
  IGiftList,
  IPagination,
} from 'types/gift'

export const filteredGiftList = ({
  pagination,
  giftItemList,
}: IGiftList): [IPagination, IFilteredGiftItem[]] | undefined => {
  return [
    pagination,
    giftItemList?.map(
      ({ content, giftType, category, id, used, mainTemplate, sender }) => {
        return {
          _id: id.toString(),
          giftType,
          category,
          template: mainTemplate,
          used,
          src: giftType === 'IMAGE' ? content : '',
          message: giftType === 'IMAGE' ? '' : content,
          sender,
        }
      },
    ),
  ]
}

export const giftDetail = ({
  category,
  content,
  giftType,
  id,
  used,
  mainTemplate,
  sender,
  receivedDate,
}: IGiftDetail): IFilteredGiftDetail | undefined => {
  return {
    _id: id.toString(),
    giftType,
    category,
    template: mainTemplate,
    used,
    src: giftType === 'IMAGE' ? content : '',
    message: giftType === 'IMAGE' ? '' : content,
    sender,
    receivedDate,
  }
}
