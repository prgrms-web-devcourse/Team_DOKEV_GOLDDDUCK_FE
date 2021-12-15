import { authInstance } from './utils'

export const getEvent = async () => {
  try {
    // 추후 라우터를 활용해 url 매개변수를 전달할 예정입니다.
    const { data } = await authInstance.get(
      'api/v1/events/8a23c692-1a01-4535-bd1a-c1bdcb52e01b',
    )
    if (data.success) {
      return data.data
    }

    throw new Error(`API ERROR(${data.error.code})::${data.error.message}`)
  } catch (error) {
    console.log(error)

    return false
  }
}

export const postGiftReceipt = async (object: object) => {
  try {
    const { data } = await authInstance.post('api/v1/gifts/fifo', object)
    if (data.success) {
      return data.data
    }

    throw new Error(`API ERROR(${data.error.code})::${data.error.message}`)
  } catch (error) {
    if (
      error.response.status === 400 &&
      error.response.data.error.code !== 'E001'
    ) {
      return [error.response.data.error.code, error.response.data.error.message]
    } else {
      console.error(error)
    }
  }
}
