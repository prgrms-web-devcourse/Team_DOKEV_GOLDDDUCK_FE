import { authInstance } from './utils'

export const getFilteredGiftList = async (
  filter: boolean | '',
  userId: number,
) => {
  try {
    const { data } = await authInstance.get(
      `api/v1/members/${userId}/gifts?used=${filter}&page=0&size=4`,
    )

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error)
  }
}
