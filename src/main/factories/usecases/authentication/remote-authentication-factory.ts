import { RemoteAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { makeAPIUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteAuthentication = (): Authentication => {
  const url = makeAPIUrl('/login')
  const axiosHttpClient = makeAxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  return remoteAuthentication
}
