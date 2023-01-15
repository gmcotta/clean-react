import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './current-account-adapter'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  describe('.set', () => {
    it('Should call LocalStorageAdapter with correct values', () => {
      const account = mockAccountModel()
      const localStorageAdapterSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
      setCurrentAccountAdapter(account)
      expect(localStorageAdapterSpy).toHaveBeenCalledWith('account', account)
    })
  })

  describe('.get', () => {
    it('Should call LocalStorageAdapter.get with correct values', () => {
      const accountMock = mockAccountModel()
      const localStorageAdapterSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get')
        .mockReturnValueOnce(accountMock)
      const account = getCurrentAccountAdapter()
      expect(localStorageAdapterSpy).toHaveBeenCalledWith('account')
      expect(accountMock).toStrictEqual(account)
    })
  })
})
