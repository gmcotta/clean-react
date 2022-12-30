import axios from 'axios'

import { mockGetRequest, mockPostRequest } from '@/data/test'
import { mockAxios, mockHttpResponse } from '@/infra/test'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  describe('post()', () => {
    it('Should call axios.post() with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('Should return correct response on axios.post()', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.post(mockPostRequest())
      const axiosResponse = await mockedAxios.post.mock.results[0].value
      expect(httpResponse).toStrictEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    it('Should return correct response on axios.post() when fails', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(request)
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
  describe('get()', () => {
    it('Should call axios.get() with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    it('Should return correct response on axios.get()', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value
      expect(httpResponse).toStrictEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    it('Should return correct response on axios.get() when fails', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.get(request)
      expect(promise).toEqual(mockedAxios.get.mock.results[0].value)
    })
  })
})
