import { faker } from '@faker-js/faker'

import { RemoteLoadSurveyResult } from '@/data/usecases'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [
    {
      image: faker.image.abstract(),
      answer: faker.random.words(),
      count: Number(faker.random.numeric(2)),
      percent: Number(faker.random.numeric(2)),
      isCurrentAccountAnswer: faker.datatype.boolean()
    },
    {
      answer: faker.random.words(),
      count: Number(faker.random.numeric(2)),
      percent: Number(faker.random.numeric(2)),
      isCurrentAccountAnswer: faker.datatype.boolean()
    }]
})
