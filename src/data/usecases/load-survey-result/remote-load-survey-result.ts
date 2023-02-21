import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases'
// import { faker } from '@faker-js/faker'

export class RemoteLoadSurveyListResult {
  constructor (private readonly url: string, private readonly httpClient: HttpClient<RemoteLoadSurveyListResult.Model>) {}

  async load (): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const remoteSurveyListResult = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return {
        ...remoteSurveyListResult,
        date: new Date(remoteSurveyListResult.date)
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

export namespace RemoteLoadSurveyListResult {
  export type Model = RemoteSurveyResultModel
}
