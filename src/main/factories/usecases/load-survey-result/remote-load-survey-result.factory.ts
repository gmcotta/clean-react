import { RemoteLoadSurveyListResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators'
import { makeAPIUrl } from '@/main/factories/http'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyListResult(
    makeAPIUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpGetClientDecorator()
  )
}
