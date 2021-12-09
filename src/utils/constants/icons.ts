import { MdArrowBack } from 'react-icons/md'
import { FaRegHandPointDown } from 'react-icons/fa'
import { BsPlusLg } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { IconType } from 'react-icons/lib'

interface IIconTypes {
  [iconName: string]: IconType
}

const $pointDown = FaRegHandPointDown
const $arrowBack = MdArrowBack
const $close = CgClose
const $plus = BsPlusLg

export const ICON_TYPES: IIconTypes = {
  remove: $pointDown,
  arrowBack: $arrowBack,
  close: $close,
  plus: $plus,
}
