// import { faker } from '@faker-js/faker'

import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
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

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
