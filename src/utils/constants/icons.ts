import { MdArrowBack } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'
import { BsPlusLg } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { IconType } from 'react-icons/lib'
import { AiFillGift } from 'react-icons/ai'

interface IIconTypes {
  [iconName: string]: IconType
}

const $remove = FiTrash2
const $arrowBack = MdArrowBack
const $close = CgClose
const $plus = BsPlusLg
const $gift = AiFillGift

export const ICON_TYPES: IIconTypes = {
  remove: $remove,
  arrowBack: $arrowBack,
  close: $close,
  plus: $plus,
  gift: $gift,
}
