import { faker } from '@faker-js/faker'

import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    test1: 'a',
    test2: 1
  }
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url: string
  async get (params: HttpGetParams): Promise<void> {
    this.url = params.url
  }
}
