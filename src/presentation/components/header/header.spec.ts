import { fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { renderWithHistory } from '@/presentation/test'

import Header from './header'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    account,
    Page: Header
  })

  return {
    history,
    setCurrentAccountMock
  }
}

describe('<Header />', () => {
  it('Should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
