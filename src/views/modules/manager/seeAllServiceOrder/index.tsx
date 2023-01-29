import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useAdmin } from 'src/services/useAdmin'
import {
  CLIENT_SEE_ALL,
  EQUIPAMENT_SEE_ALL,
  PIECE_SEE_ALL,
  SERVICE_SEE_ALL,
} from 'src/store/actions'
import { fromApi } from '../../administration/services/adapters'
import Filters from './filters'
import TableView from './Table'

type Props = {}

const SeeAllServiceOrder = (props: Props) => {
  const dispatch = useDispatch()
  const { apiAdmin } = useAdmin()

  const getServices = async () => {
    try {
      const response = await apiAdmin.get(`services`, {
        params: {
          description: undefined,
        },
      })
      dispatch({
        type: SERVICE_SEE_ALL,
        payload: await fromApi(response),
      })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar os servicos, atualize a página e tente novamente.',
      )
    }
  }

  const getPieces = async () => {
    try {
      const response = await apiAdmin.get(`pieces`, {
        params: {
          description: undefined,
        },
      })
      dispatch({
        type: PIECE_SEE_ALL,
        payload: await fromApi(response),
      })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar as peças, atualize a página e tente novamente.',
      )
    }
  }

  const getEquipaments = async () => {
    try {
      const response = await apiAdmin.get(`equipaments`, {
        params: {
          equipamentName: undefined,
          brand: undefined,
          model: undefined,
          serialNumber: undefined,
        },
      })
      dispatch({
        type: EQUIPAMENT_SEE_ALL,
        payload: await fromApi(response),
      })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar os equipamentos, atualize a página e tente novamente.',
      )
    }
  }
  const getOrderServices = async () => {
    try {
      const { data } = await apiAdmin.get(`orderServices`, {
        params: {
          clientName: undefined,
          osNumber: undefined,
        },
      })
      console.log({ data })
      // dispatch({
      //   type: EQUIPAMENT_SEE_ALL,
      //   payload: await fromApi(response),
      // })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar os equipamentos, atualize a página e tente novamente.',
      )
    }
  }

  useEffect(() => {
    getServices()
    getPieces()
    getEquipaments()
  }, [])

  useEffect(() => {
    getOrderServices()
  }, [])

  return (
    <>
      <Filters />
      <TableView />
    </>
  )
}

export default SeeAllServiceOrder
