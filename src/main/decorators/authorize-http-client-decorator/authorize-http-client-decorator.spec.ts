import { faker } from '@faker-js/faker'

import { HttpRequest } from '@/data/protocols/http'
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { AuthorizeHttpClientDecorator } from './authorize-http-client-decorator'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpGetClientSpy)
  return {
    getStorageSpy,
    httpGetClientSpy,
    sut
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  it('Should call GetStorage with correct value', async () => {
    const { getStorageSpy, sut } = makeSut()
    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('Should not add headers if GetStorage is invalid', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(['get', 'put', 'post']),
      headers: {
        [faker.database.column()]: faker.random.word()
      }
    }
    await sut.request(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.method).toBe(httpRequest.method)
    expect(httpGetClientSpy.headers).toStrictEqual(httpRequest.headers)
  })

  it('Should add headers to HttpClient', async () => {
    const { httpGetClientSpy, sut, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(['get', 'put', 'post'])
    }
    await sut.request(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.method).toBe(httpRequest.method)
    expect(httpGetClientSpy.headers).toStrictEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('Should merge headers to HttpClient', async () => {
    const { httpGetClientSpy, sut, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(['get', 'put', 'post']),
      headers: {
        field: faker.random.word()
      }
    }
    await sut.request(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.method).toBe(httpRequest.method)
    expect(httpGetClientSpy.headers).toStrictEqual({
      'x-access-token': getStorageSpy.value.accessToken,
      field: httpRequest.headers.field
    })
  })

  it('Should return the same result as HttpClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toStrictEqual(httpGetClientSpy.response)
  })
})
