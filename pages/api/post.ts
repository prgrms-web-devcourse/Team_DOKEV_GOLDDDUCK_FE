import { multipart } from './utils'

export const addEventApi = async (data: any) => {
  try {
    await multipart.post('api/v1/events', data).then((res) => console.log(res))
  } catch (error) {
    console.log(error)
  }
}
