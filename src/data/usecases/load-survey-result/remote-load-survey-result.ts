import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases'
// import { faker } from '@faker-js/faker'

export class RemoteLoadSurveyResult {
  constructor (private readonly url: string, private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Model>) {}

  async load (): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const remoteSurveyResult = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return {
        ...remoteSurveyResult,
        date: new Date(remoteSurveyResult.date)
      }
      // case HttpStatusCode.serverError: return {
      //   question: faker.random.words(10),
      //   date: new Date(),
      //   answers: [
      //     {
      //       image: faker.image.abstract(),
      //       answer: faker.random.words(),
      //       count: Number(faker.random.numeric(2)),
      //       percent: Number(faker.random.numeric(2)),
      //       isCurrentAccountAnswer: faker.datatype.boolean()
      //     },
      //     {
      //       answer: faker.random.words(),
      //       count: Number(faker.random.numeric(2)),
      //       percent: Number(faker.random.numeric(2)),
      //       isCurrentAccountAnswer: faker.datatype.boolean()
      //     }]
      // }
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = RemoteSurveyResultModel
}
