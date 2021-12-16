import { authInstance } from './utils'

export const getFilteredEventList = async (filter: string | '') => {
  try {
    const { data } = await authInstance.get(
      `api/v1/members/2/events?eventProgressStatus=${filter}&page=0&size=4`,
    )

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const getEventDetail = async (code: string) => {
  try {
    const { data } = await authInstance.get(`api/v1/events/${code}`)

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error)
  }
}
