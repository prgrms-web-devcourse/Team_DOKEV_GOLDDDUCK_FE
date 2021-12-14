import { authInstance } from './utils'

export const getFilteredGiftList = async (filter: string) => {
  try {
    const { data } = await authInstance.get(
      `api/v1/members/1/gifts?used=${
        filter === 'used' ? true : filter === 'un_used' ? false : ''
      }&page=0&size=4`,
    )

    if (data.success) {
      return data.data
    }

    throw new Error(`API error::${data.error.message}`)
  } catch (error) {
    console.error(error)
  }
}
