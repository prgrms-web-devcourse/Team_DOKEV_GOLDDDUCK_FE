import React, { useCallback } from 'react'
import Text from '@components/Text'
import styled from '@emotion/styled'
import { COLORS } from '@utils/constants/colors'

interface ICheckbox {
  id: string
  name: string
  size?: 'MICRO' | 'SMALL' | 'BASE' | 'MEDIUM' | 'LARGE'
  defaultChecked?: boolean
  onClick: React.MouseEventHandler<HTMLInputElement>
}

const Checkbox = ({
  id,
  name,
  size = 'SMALL',
  defaultChecked = false,
  onClick,
}: ICheckbox) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      onClick?.(e)
    },
    [onClick],
  )

  console.log(defaultChecked, id)

  return (
    <Label key={id}>
      <CheckboxInput
        defaultChecked={defaultChecked ? true : false}
        type="checkbox"
        onClick={handleClick}
        id={id}
      />
      <CheckboxSwitch
        style={{
          backgroundColor: defaultChecked ? COLORS.WHITE : COLORS.BLACK,
          border: `1px solid ${
            defaultChecked ? COLORS.WHITE : COLORS.TEXT_GRAY_LIGHT
          }`,
        }}>
        <Text
          style={{
            color: defaultChecked ? COLORS.BLACK : COLORS.TEXT_GRAY_LIGHT,
            ...textStyle,
          }}
          size={size}>
          {name}
        </Text>
      </CheckboxSwitch>
    </Label>
  )
}

const textStyle: React.CSSProperties = {
  whiteSpace: 'nowrap',
}

const CheckboxSwitch = styled.div`
  transition: background-color 0.2s ease-in-out;
  display: inline-block;
  padding: 6px 10px;
  border-radius: 20px;
  user-select: none;
`

const Label = styled.label`
  cursor: pointer;
  margin: 0 4px;
`

const CheckboxInput = styled.input`
  display: none;
`

export default Checkbox
