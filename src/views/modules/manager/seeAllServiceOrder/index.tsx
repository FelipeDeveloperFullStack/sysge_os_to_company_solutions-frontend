/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useAdmin } from 'src/services/useAdmin'
import {
  CLIENT_SEE_ALL,
  EQUIPAMENT_SEE_ALL,
  PIECE_SEE_ALL,
  SERVICE_ORDER_SEE_ALL,
  SERVICE_SEE_ALL,
} from 'src/store/actions'
import { IStore } from 'src/store/Types'
import { fromApi } from '../../administration/services/adapters'
import Filters from './filters'
import TableView from './Table'

type Props = {}

const SeeAllServiceOrder = (props: Props) => {
  const dispatch = useDispatch()
  const { apiAdmin } = useAdmin()
  const serviceOrderFiltered = useSelector(
    (state: IStore) => state.serviceOrder.serviceOrderFilter,
  )
  const makeRequest = useSelector((state: IStore) => state.layout.makeRequest)

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
      const response = await apiAdmin.get(`orderServices`, {
        params: {
          clientName: undefined,
          osNumber: undefined,
        },
      })
      dispatch({
        type: SERVICE_ORDER_SEE_ALL,
        payload: await fromApi(response),
      })
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
  }, [makeRequest, serviceOrderFiltered])

  return (
    <>
      <Filters />
      <TableView />
    </>
  )
}

export default SeeAllServiceOrder
