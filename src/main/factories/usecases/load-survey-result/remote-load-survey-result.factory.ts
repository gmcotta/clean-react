import { RemoteLoadSurveyResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeAPIUrl } from '@/main/factories/http'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeAPIUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator()
  )
}
