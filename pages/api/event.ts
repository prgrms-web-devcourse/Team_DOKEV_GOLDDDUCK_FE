import { authInstance } from './utils'

export const getFilteredEventList = async (filter: string | '') => {
  try {
    const { data } = await authInstance.get(
      `/api/v1/members/2/events?eventProgressStatus=${filter}&page=0&size=4`,
    )

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const getEvent = async () => {
  try {
    // 추후 라우터를 활용해 url 매개변수를 전달할 예정입니다.
    const { data } = await authInstance.get(
      'api/v1/events/499b9ecb-26ad-46bb-afb0-ddd35e1f9f71',
    )
    if (data.success) {
      return data.data
    }
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

export const postRandomGiftReceipt = async (object: object) => {
  try {
    const { data } = await authInstance.post('api/v1/gifts/random', object)
    if (data.success) {
      return data.data
    }
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
