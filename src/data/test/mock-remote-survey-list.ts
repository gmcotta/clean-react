import { faker } from '@faker-js/faker'

import { RemoteLoadSurveyList } from '@/data/usecases'

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => {
  return [
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel()
  ]
}

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean()
})
