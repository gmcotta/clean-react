import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'

const history = createMemoryHistory({ initialEntries: ['/'] })

describe('PrivateRoute', () => {
  it('Should redirect to /login if token is empty', () => {
    render(
      <Router location={history.location} navigator={history}>
        <PrivateRoute />
      </Router>
    )
    expect(history.location.pathname).toBe('/login')
  })
})
