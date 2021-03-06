import router from 'next/router'
import { authInstance } from './utils'

// 이벤트 전체 목록 조회
export const getFilteredEventList = async (
  filter: string | '',
  userId: number,
  page: number,
  size: number,
) => {
  try {
    const { data } = await authInstance.get(
      `api/v1/members/${userId}/events?eventProgressStatus=${filter}&page=${page}&size=${size}`,
    )

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error.message)
  }
}

// 이벤트 단건 조회
export const getEventDetail = async (code: string) => {
  try {
    const { data } = await authInstance.get(`api/v1/events/${code}`)

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error.message)
  }
}

// 이벤트 삭제
export const deleteEvent = async (userId: number, eventId: string) => {
  try {
    await authInstance
      .delete(`api/v1/members/${userId}/events/${eventId}`)
      .then(
        (res) =>
          res.data.success &&
          router.isReady &&
          router.push('/mypage?tab=event'),
      )
  } catch (error) {
    console.error(error.message)
  }
}

// 이벤트 당첨자 목록 조회
export const getEventWinners = async (userId: number, eventId: string) => {
  try {
    const { data } = await authInstance.get(
      `api/v1/members/${userId}/${eventId}/winners`,
    )

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const getEvent = async (url: string | string[]) => {
  try {
    const { data } = await authInstance.get(`api/v1/events/${url}`)
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
