import { faker } from '@faker-js/faker'

import { LoadSurveyList } from '@/domain/usecases'

export const mockSurveyListModel = (): LoadSurveyList.Model[] => {
  return [
    mockSurveyModel(),
    mockSurveyModel(),
    mockSurveyModel()
  ]
}

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()
  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}
