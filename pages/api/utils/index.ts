import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL =
  'http://ec2-3-36-59-242.ap-northeast-2.compute.amazonaws.com:8080/'

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

const axiosMultipart = (
  url: string,
  options?: AxiosRequestConfig<object> | undefined,
) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const userToken = token ? token.replace(/\"/gi, '') : ''

  const instance = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-GOLDDDUCK-AUTH': `Bearer ${userToken}`,
    },
    ...options,
  })

  return instance
}

export const authInstance = axiosAuthApi(BASE_URL)
export const multipart = axiosMultipart(BASE_URL)
