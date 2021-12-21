import { authInstance } from './utils'

export const getUserInfo = async () => {
  try {
    const { data } = await authInstance.get('api/v1/members/me')

    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.log(error.message)
  }
}

// axios get, delete 옵션은 data필드가 없다 따라서 아래의 코드 예시처럼
// 데이터 객체로 묶어서 사용해야 한다.

// export const deleteComment = async (id: any) => {
//   try {
//     await authInstance.delete('comments/delete', { data: id })
//   } catch (error) {
//     console.log(error)
//   }
// }

// 얘는 그냥 넣어줘도 됨
// export const likeComment = async (postId: any) => {
//   try {
//     const { data } = await authInstance.post('likes/create', postId)

//     return data._id
//   } catch (error) {
//     console.log(error)
//   }
// }
