import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useLoading } from 'src/hooks/useLoading'
import { MODEL_SEE_ALL } from 'src/store/actions'
import { IStore } from 'src/store/Types'
import { useAdmin } from '../../../../services/useAdmin'
import { fromApi } from './adapters'
import Filters from './filters'
import { Container } from './styles'
import Table from './Table'

const Model: React.FC = () => {
  const { apiAdmin } = useAdmin()

  const dispatch = useDispatch()
  const { Loading } = useLoading()

  const modelFiltered = useSelector((state: IStore) => state.model.modelFilter)

  const makeRequest = useSelector((state: IStore) => state.layout.makeRequest)

  const getModels = async () => {
    try {
      Loading.turnOn()
      const response = await apiAdmin.get(`models`, {
        params: {
          description: modelFiltered.description || undefined,
        },
      })
      dispatch({
        type: MODEL_SEE_ALL,
        payload: await fromApi(response),
      })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar os modelos, atualize a página e tente novamente.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  useEffect(() => {
    getModels()
  }, [modelFiltered, makeRequest])

  return (
    <Container>
      <Filters />
      <Table />
    </Container>
  )
}

export default Model
