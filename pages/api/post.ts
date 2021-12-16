import { authInstance } from './utils'

export const addEventApi = async (formData: any) => {
  try {
    const { data } = await authInstance.post('api/v1/events', formData)

    return data.data
  } catch (error) {
    console.log(error)
  }
}
