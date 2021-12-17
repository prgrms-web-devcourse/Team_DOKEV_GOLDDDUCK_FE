import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'https://gold-dduck.kro.kr/'

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
