import { authInstance } from './utils'

export const getFilteredGiftList = async (filter: boolean | '') => {
  try {
    const { data } = await authInstance.get(
      `api/v1/members/1/gifts?used=${filter}&page=0&size=4`,
    )

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error)
  }
}
