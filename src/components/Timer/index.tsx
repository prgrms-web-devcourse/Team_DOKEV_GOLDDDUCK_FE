import { useState, useEffect, CSSProperties } from 'react'
import { formatTimeNumber } from '@utils/formatTimeNumber'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'

interface ITimer {
  time: Date
  size?: string
  color?: string
  style?: CSSProperties
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

const Timer = ({
  time = new Date(),
  size = 'BASE',
  color = 'WHITE',
  ...style
}: ITimer): React.ReactElement => {
  const [restTime, setRestTime] = useState('')
  let timer: NodeJS.Timer
  const { [size]: fontSize } = FONT_SIZES
  const { [color]: fontColor } = COLORS

  const showRemaining = (): void => {
    const now = new Date()
    const distance = Number(time) - Number(now)

    if (distance < 0) {
      clearInterval(timer)

      return
    }

    const hours = formatTimeNumber(Math.floor(distance / HOUR))
    const minutes = formatTimeNumber(Math.floor((distance % HOUR) / MINUTE))
    const seconds = formatTimeNumber(Math.floor((distance % MINUTE) / SECOND))
    setRestTime(`${hours}:${minutes}:${seconds}`)
  }

  useEffect(() => {
    timer = setInterval(showRemaining, 1000)
  }, [showRemaining])

  return (
    <div style={{ fontSize, color: fontColor, ...style }}>
      {restTime ? restTime : '00:00:00'}
    </div>
  )
}

export default Timer
