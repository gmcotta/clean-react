import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: {
    test1: 'a',
    test2: 1
  },
  status: faker.random.numeric()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: {
    test1: 'a',
    test2: 1
  }
})

describe('AxiosHttpClient', () => {
  it('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('Should return the correct statusCode and body', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    const httpResponse = await sut.post(request)
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
