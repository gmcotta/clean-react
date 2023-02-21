import { faker } from '@faker-js/faker'

import {
  HttpMethod,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HttpClient
} from '@/data/protocols/http'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['get', 'put', 'post']),
  headers: {
    test1: 'a',
    test2: 1
  },
  body: {
    test1: 'b',
    test2: 2
  }
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: HttpMethod
  headers?: any
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.headers = data.headers
    this.body = data.body
    return this.response
  }
}
