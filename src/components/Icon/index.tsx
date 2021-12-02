import styled from '@emotion/styled'
import { ICON_TYPES } from '../../utils/constants/icons'
import { FONT_SIZES } from '../../utils/constants/sizes'
import { COLORS } from '../../utils/constants/colors'

interface IIcon {
  name: string
  size?: string
  color?: string
  onIconClick?(): void
}

const Icon = ({
  name,
  size = FONT_SIZES.base,
  color = COLORS.white,
  onIconClick,
  ...props
}: IIcon): JSX.Element => {
  const { [size]: fontSize } = FONT_SIZES
  const { [name]: IconTag } = ICON_TYPES
  const { [color]: fontColor } = COLORS

  const StyledIcon = styled(IconTag)`
    font-size: ${fontSize};
    color: ${fontColor};
  `

  return <StyledIcon onClick={onIconClick} {...props} />
}

export default Icon
