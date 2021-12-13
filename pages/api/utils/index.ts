import axios, { AxiosRequestConfig } from 'axios'
// import { getItem } from '@SessionStorage'

const BASE_URL = 'http://maenguin.iptime.org:8080/'

const axiosAuthApi = (
  url: string,
  options?: AxiosRequestConfig<any> | undefined,
) => {
  //   const token = getItem('userInformation')
  const token = 'aa'

  const instance = axios.create({
    baseURL: url,
    headers: { 'X-GOLDDDUCK-AUTH': `Bearer ${token}` },
    ...options,
  })

  return instance
}

export const authInstance = axiosAuthApi(BASE_URL)
