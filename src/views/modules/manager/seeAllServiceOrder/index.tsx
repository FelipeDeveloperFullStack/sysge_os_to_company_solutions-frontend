/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import {
  EQUIPAMENT_SEE_ALL,
  PIECE_SEE_ALL,
  SERVICE_ORDER_SEE_ALL,
  SERVICE_SEE_ALL,
} from 'src/store/actions'
import { IStore } from 'src/store/Types'
import useLocalStorage from 'use-local-storage'
import { fromApi } from '../../administration/services/adapters'
import { OSData } from '../serviceOrder/create/type'
import Filters from './filters'
import { ModalPDF } from './messages/ModalPDF'
import TableView from './Table'

type Props = {}

const SeeAllServiceOrder = (props: Props) => {
  const dispatch = useDispatch()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()
  const { showMessage, closeModal } = useModal()
  const [isOpenModalInformation, setIsOpenModalInformation] = useState(false)
  const serviceOrderFiltered = useSelector(
    (state: IStore) => state.serviceOrder.serviceOrderFilter,
  )
  const makeRequest = useSelector((state: IStore) => state.layout.makeRequest)
  const [selectedAllRowIds, setSelectedAllRowIds] = useState<string[]>(
    [] as string[],
  )
  const [oSData, setOSData] = useLocalStorage<OSData[]>(
    'oSData',
    [] as OSData[],
  )

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
        payload: await (
          await fromApi(response)
        ).filter((item) => item.status === 'PENDENTE'),
      })
    } catch (error) {
      exceptionHandle(
        error,

        'Ops! Houve um erro ao tentar buscar os equipamentos, atualize a página e tente novamente.',
      )
    }
  }

  const onHandleGeneratePDF = async (id: string) => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get(`orderServices/${id}`)
      setOSData((previousState) => [...previousState, data])
    } catch (error) {
      exceptionHandle(
        error,

        'Opss! Houve um erro ao tentar gerar a Ordem de Serviço.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  const onHandleGenerateOS = async () => {
    setOSData([])
    let index = 0
    for (index; index < selectedAllRowIds.length; index++) {
      const item = selectedAllRowIds[index]
      await onHandleGeneratePDF(item)
      if (index === selectedAllRowIds.length - 1) {
        //window.location.reload()
        const data = JSON.parse(window.localStorage.getItem('oSData'))
        showMessage(ModalPDF, { oSData: data })
        setIsOpenModalInformation(true)
      }
    }
  }

  useEffect(() => {
    getServices()
    getPieces()
    getEquipaments()
    scroll(0, 0)
  }, [])

  useEffect(() => {
    getOrderServices()
    getServices()
    getPieces()
    getEquipaments()
  }, [makeRequest, serviceOrderFiltered])

  return (
    <section>
      <Filters
        onHandleGenerateOS={onHandleGenerateOS}
        selectedAllRowIds={selectedAllRowIds}
      />
      <TableView
        setSelectedAllRowIds={setSelectedAllRowIds}
        setIsOpenModalInformation={setIsOpenModalInformation}
        isOpenModalInformation={isOpenModalInformation}
      />
    </section>
  )
}

export default SeeAllServiceOrder
