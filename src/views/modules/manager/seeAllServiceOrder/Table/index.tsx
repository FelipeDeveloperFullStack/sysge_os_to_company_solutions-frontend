/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector } from 'react-redux'
import { IStore } from 'src/store/Types'
import { useColumns } from './Columns'
import { OSData } from '../../serviceOrder/create/type'
import { DataTable } from 'src/components/Widgets/DataTable'
import { MappedDataServiceOrders } from '../types'
import ServiceOrder from '../../serviceOrder'
import { useAdmin } from 'src/services/useAdmin'
import { useLoading } from 'src/hooks/useLoading'
import { toast } from 'src/components/Widgets/Toastify'
import useLocalStorage from 'use-local-storage'

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
    onHandleGeneratePDF('643c5cfc3f2de2aed5fa3689')
    onHandleGeneratePDF('643c5c923f2de2aed5fa3668')
    onHandleGeneratePDF('643c52863f2de2aed5fa360c')
    onHandleGeneratePDF('643c25651de333db07228c98')
    return () => {
      window.localStorage.removeItem('oSData')
    }
  }, [])

  return (
    <>
      <DataTable
        rows={mappedDataServiceOrders(serviceOrdersStore)}
        columns={columns}
        pageSize={5}
      />
    </>
  )
}

export default TableView
