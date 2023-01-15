import { faker } from '@faker-js/faker'

import { HttpGetParams } from '@/data/protocols/http'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
  return {
    getStorageSpy,
    httpGetClientSpy,
    sut
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('Should call GetStorage with correct value', async () => {
    const { getStorageSpy, sut } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('Should not add headers if GetStorage is invalid', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        [faker.database.column()]: faker.random.word()
      }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toStrictEqual(httpRequest.headers)
  })

  it('Should add headers to HttpGetClient', async () => {
    const { httpGetClientSpy, sut, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toStrictEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('Should merge headers to HttpGetClient', async () => {
    const { httpGetClientSpy, sut, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.word()
      }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toStrictEqual({
      'x-access-token': getStorageSpy.value.accessToken,
      field: httpRequest.headers.field
    })
  })

  it('Should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toStrictEqual(httpGetClientSpy.response)
  })
})
