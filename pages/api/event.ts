import { authInstance } from './utils'

export const getEvent = async () => {
  try {
    const { data } = await authInstance.get(
      'api/v1/events/9a4e7cbe-95c1-462b-8cfa-1ec40751784e',
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
      console.log(400, error.response)

      return [error.response.data.error.code, error.response.data.error.message]
    } else {
      console.error(error)
    }
  }
}
