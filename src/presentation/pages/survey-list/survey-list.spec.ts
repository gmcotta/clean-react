import { fireEvent, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'

import { AccountModel } from '@/domain/models'
import { LoadSurveyListSpy } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { renderWithHistory } from '@/presentation/test'

import SurveyList from './survey-list'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => SurveyList({ loadSurveyList: loadSurveyListSpy })
  })
  return { loadSurveyListSpy, history, setCurrentAccountMock }
}

describe('SurveyList', () => {
  it('Should show 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveyList)
  })

  it('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  it('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
    })
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('Should render error component on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    })
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  it('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    })
    expect(history.location.pathname).toBe('/login')
  })

  it('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'))
    })
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
