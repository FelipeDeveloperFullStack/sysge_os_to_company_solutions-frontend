/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useLoading } from 'src/hooks/useLoading'
import { EQUIPAMENT_SEE_ALL } from 'src/store/actions'
import { IStore } from 'src/store/Types'
import { useAdmin } from '../../../../services/useAdmin'
import { fromApi } from './adapters'
import Filters from './filters'
import { Container } from './styles'
import Table from './Table'

const Equipament: React.FC = () => {
  const { apiAdmin } = useAdmin()

  const dispatch = useDispatch()
  const { Loading } = useLoading()

  const equipamentFiltered = useSelector(
    (state: IStore) => state.equipament?.equipamentFilter,
  )

  const makeRequest = useSelector((state: IStore) => state.layout.makeRequest)

  const getEquipaments = async () => {
    try {
      Loading.turnOn()
      const response = await apiAdmin.get(`equipaments`, {
        params: {
          equipamentName: equipamentFiltered.equipamentName || undefined,
          brand: equipamentFiltered.brand || undefined,
          model: equipamentFiltered.model || undefined,
          serialNumber: equipamentFiltered.serialNumber || undefined,
        },
      })
      dispatch({
        type: EQUIPAMENT_SEE_ALL,
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
    getEquipaments()
    scroll(0, 0)
  }, [equipamentFiltered, makeRequest])

  return (
    <Container>
      <Filters />
      <Table />
    </Container>
  )
}

export default Equipament
