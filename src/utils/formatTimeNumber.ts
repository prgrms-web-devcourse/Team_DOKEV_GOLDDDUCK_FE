export const formatTimeNumber = (number: number): string => {
  const formattedNumber = number < 10 ? `0${number}` : `${number}`

  return formattedNumber
}
