import { faker } from '@faker-js/faker'

import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'
import { LocalUpdateCurrentAccount } from './local-update-current-account'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  it('Should call setStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()
    await sut.save(account)
    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  it('Should throw if SetStorage throws', async () => {
    const account = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.firstName()
    }

    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(account)
    await expect(promise).rejects.toThrow(new Error())
  })

  it('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
