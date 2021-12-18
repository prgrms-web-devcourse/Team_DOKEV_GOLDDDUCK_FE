import { authInstance } from './utils'

// 선물 전체 목록 조회
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

// 선물 단건 조회
export const getGiftDetail = async (userId: number, giftId: string) => {
  try {
    const { data } = await authInstance.get(
      `api/v1/members/${userId}/giftItems/${giftId}`,
    )

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error)
  }
}

// 선물 사용여부 수정
export const updateGiftUsed = async (userId: number, giftId: string) => {
  try {
    await authInstance.patch(`/api/v1/members/${userId}/giftItems/${giftId}`)
  } catch (error) {
    console.error(error)
  }
}
