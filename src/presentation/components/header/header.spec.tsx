import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from '@remix-run/router'

import { APIContext } from '@/presentation/contexts'
import Header from './header'

const history = createMemoryHistory({ initialEntries: ['/'] })

describe('<Header />', () => {
  it('Should call setCurrentAccount with null', () => {
    const setCurrentAccountMock = jest.fn()
    render(
      <APIContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </APIContext.Provider>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
