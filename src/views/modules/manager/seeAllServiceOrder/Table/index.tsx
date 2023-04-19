/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IStore } from 'src/store/Types'
import { useColumns } from './Columns'
import { OSData } from '../../serviceOrder/create/type'
import { DataTable } from 'src/components/Widgets/DataTable'
import { MappedDataServiceOrders } from '../types'
import { useAdmin } from 'src/services/useAdmin'
import { useLoading } from 'src/hooks/useLoading'
import { toast } from 'src/components/Widgets/Toastify'
import useLocalStorage from 'use-local-storage'
import { Button } from 'src/components'

const TableView: React.FC = () => {
  const serviceOrdersStore = useSelector(
    (state: IStore) => state.serviceOrder.serviceOrders,
  )
  const columns = useColumns()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()
  const [oSData, setOSData] = useLocalStorage<OSData[]>(
    'oSData',
    [] as OSData[],
  )
  const [isRowSelected, setIsRowSelected] = useState<MappedDataServiceOrders[]>(
    [] as MappedDataServiceOrders[],
  )
  const [selectedAllRowIds, setSelectedAllRowIds] = useState<string[]>(
    [] as string[],
  )

  const mappedDataServiceOrders = (
    serviceOrder: OSData[],
  ): MappedDataServiceOrders[] => {
    return serviceOrder
      .map((item: OSData) => {
        return {
          id: item._id,
          name: item.client.name,
          osNumber: item.osNumber,
          dateOS: item.dateOS,
          total: item.total,
          status: item.status,
          dateGeneratedOS: item.dateGeneratedOS,
        }
      })
      .sort((a, b) => Number(b.osNumber) - Number(a.osNumber))
  }

  const onHandleGeneratePDF = async (id: string) => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get(`orderServices/${id}`)
      // window.localStorage.setItem('oSData', JSON.stringify(data))
      setOSData((previousState) => [...previousState, data])
    } catch (error) {
      toast.error('Opss! Houve um erro ao tentar gerar a Ordem de Serviço.')
    } finally {
      Loading.turnOff()
    }
  }

  React.useEffect(() => {
    return () => {
      window.localStorage.removeItem('oSData')
    }
  }, [])

  const onHandleGenerateOS = async () => {
    setOSData([])
    let index = 0
    for (index; index < selectedAllRowIds.length; index++) {
      const item = selectedAllRowIds[index]
      await onHandleGeneratePDF(item)
      if (index === selectedAllRowIds.length - 1) {
        window.location.reload()
      }
    }
  }

  return (
    <>
      {!!selectedAllRowIds?.length && (
        <Button
          textButton={`Gerar Ordens de Serviço (${selectedAllRowIds?.length})`}
          variant="contained"
          onClick={onHandleGenerateOS}
        />
      )}
      <DataTable
        rows={mappedDataServiceOrders(serviceOrdersStore)}
        columns={columns}
        pageSize={5}
        checkboxSelection
        //setCellClick={setIsRowSelected}
        setSelectedAllRowIds={setSelectedAllRowIds}
      />
    </>
  )
}

export default TableView
