import React from 'react'
import { useSelector } from 'react-redux'
import { IStore } from 'src/store/Types'
import { useColumns } from './Columns'
import { OSData } from '../../serviceOrder/create/type'
import { DataTable } from 'src/components/Widgets/DataTable'
import { MappedDataServiceOrders } from '../types'

const TableView: React.FC = () => {
  const serviceOrdersStore = useSelector(
    (state: IStore) => state.serviceOrder.serviceOrders,
  )
  const columns = useColumns()

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
        }
      })
      .sort((a, b) => Number(b.osNumber) - Number(a.osNumber))
  }

  return (
    <DataTable
      rows={mappedDataServiceOrders(serviceOrdersStore)}
      columns={columns}
      pageSize={5}
    />
  )
}

export default TableView
