import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://maenguin.iptime.org:8080/'

const axiosAuthApi = (
  url: string,
  options?: AxiosRequestConfig<any> | undefined,
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
