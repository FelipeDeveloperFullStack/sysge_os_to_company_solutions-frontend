import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useLoading } from 'src/hooks/useLoading'
import { BRAND_SEE_ALL } from 'src/store/actions'
import { IStore } from 'src/store/Types'
import { useAdmin } from '../../../../services/useAdmin'
import { fromApi } from './adapters'
import Filters from './filters'
import { Container } from './styles'
import Table from './Table'

const Brand: React.FC = () => {
  const { apiAdmin } = useAdmin()

  const dispatch = useDispatch()
  const { Loading } = useLoading()

  const brandFiltered = useSelector((state: IStore) => state.brand.brandFilter)

  const makeRequest = useSelector((state: IStore) => state.layout.makeRequest)

  const getBrands = async () => {
    try {
      Loading.turnOn()
      const response = await apiAdmin.get(`brands`, {
        params: {
          description: brandFiltered.description || undefined,
        },
      })
      dispatch({
        type: BRAND_SEE_ALL,
        payload: await fromApi(response),
      })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar as marcas, atualize a página e tente novamente.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  useEffect(() => {
    getBrands()
  }, [brandFiltered, makeRequest])

  return (
    <Container>
      <Filters />
      <Table />
    </Container>
  )
}

export default Brand
