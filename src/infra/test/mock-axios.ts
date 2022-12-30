import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockHttpResponse = (): { data: object, status: number } => {
  return {
    data: {
      test1: faker.random.word(),
      test2: Number(faker.random.numeric())
    },
    status: Number(faker.random.numeric(3))
  }
}

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
