import { MdArrowBack } from 'react-icons/md'
import { FaRegHandPointDown } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsPlusLg } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { IconType } from 'react-icons/lib'
import { AiFillGift } from 'react-icons/ai'

interface IIconTypes {
  [iconName: string]: IconType
}

const $pointDown = FaRegHandPointDown
const $arrowBack = MdArrowBack
const $close = CgClose
const $plus = BsPlusLg
const $gift = AiFillGift
const $remove = AiOutlineDelete

export const ICON_TYPES: IIconTypes = {
  pointDown: $pointDown,
  arrowBack: $arrowBack,
  close: $close,
  plus: $plus,
  gift: $gift,
  remove: $remove,
}
