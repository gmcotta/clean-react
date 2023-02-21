import { faker } from '@faker-js/faker'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      answer: faker.random.word(),
      count: Number(faker.random.numeric()),
      isCurrentAccountAnswer: true,
      percent: Number(faker.random.numeric()),
      image: faker.image.imageUrl()
    },
    {
      answer: faker.random.word(),
      count: Number(faker.random.numeric()),
      isCurrentAccountAnswer: false,
      percent: Number(faker.random.numeric())
    }
  ]
})

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(3)
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  survey = mockSurveyResultModel()
  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return this.survey
  }
}
