import { useUserContext } from '@contexts/UserProvider'
import axios, { AxiosRequestConfig } from 'axios'
// import { getItem } from '@SessionStorage'

const BASE_URL = 'http://maenguin.iptime.org:8080/'

const axiosAuthApi = (
  url: string,
  options?: AxiosRequestConfig<any> | undefined,
) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    const instance = axios.create({
      baseURL: url,
      headers: { 'X-GOLDDDUCK-AUTH': `Bearer ${token}` },
      ...options,
    })

    return instance
  }
}

export const authInstance = axiosAuthApi(BASE_URL)
