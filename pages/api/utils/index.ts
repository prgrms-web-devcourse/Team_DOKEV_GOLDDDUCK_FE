import axios, { AxiosRequestConfig } from 'axios'
const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT

const BASE_URL = API_END_POINT as string

const axiosAuthApi = (
  url: string,
  options?: AxiosRequestConfig<object> | undefined,
) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const userToken = token ? token.replace(/\"/gi, '') : ''

  const instance = axios.create({
    baseURL: url,
    headers: { 'X-GOLDDDUCK-AUTH': `Bearer ${userToken}` },
    ...options,
  })

  return instance
}

export const authInstance = axiosAuthApi(BASE_URL)
