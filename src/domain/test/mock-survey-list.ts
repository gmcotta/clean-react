import { faker } from '@faker-js/faker'

import { SurveyModel } from '@/domain/models'

export const mockSurveyListModel = (): SurveyModel[] => {
  return [
    mockSurveyModel(),
    mockSurveyModel(),
    mockSurveyModel()
  ]
}

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
      image: faker.internet.url()
    },
    {
      answer: faker.random.words(4)
    }
  ],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})
