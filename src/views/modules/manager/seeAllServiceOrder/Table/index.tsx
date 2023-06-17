/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useColumns } from './Columns'
import { OSData } from '../../serviceOrder/create/type'
import { DataTable } from 'src/components/Widgets/DataTable'
import { MappedDataServiceOrders } from '../types'
import { useModal } from 'src/hooks/useModal'
import { ModalInformation } from '../messages/ModalInformation'
import { LAYOUT_MAKE_REQUEST } from 'src/store/actions'

type TableViewProps = {
  setSelectedAllRowIds: React.Dispatch<React.SetStateAction<string[]>>
  setIsOpenModalInformation: React.Dispatch<React.SetStateAction<boolean>>
  isOpenModalInformation: boolean
  serviceOrdersStore: OSData[]
}

const TableView: React.FC<TableViewProps> = ({
  setSelectedAllRowIds,
  setIsOpenModalInformation,
  isOpenModalInformation,
  serviceOrdersStore,
}) => {
  const columns = useColumns()
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const osDataAdded = JSON.parse(window.localStorage.getItem('osDataAdded'))

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
          typeDocument: item.typeDocument,
          dateGeneratedOS: item.dateGeneratedOS,
        }
      })
      .sort((a, b) => Number(b.osNumber) - Number(a.osNumber))
  }

  const removeLocalStorage = () => {
    window.localStorage.removeItem('oSData')
    window.localStorage.removeItem('osDataAdded')
  }

  React.useEffect(() => {
    return () => {
      removeLocalStorage()
    }
  }, [])

  const updateTableList = () => {
    dispatch({
      type: LAYOUT_MAKE_REQUEST,
      payload: {
        makeRequest: Math.random(),
      },
    })
  }

  useEffect(() => {
    if (osDataAdded) {
      const oSData = JSON.parse(window.localStorage.getItem('oSData'))
      if (osDataAdded?.length === oSData?.length) {
        setIsOpenModalInformation(false)
        closeModal()
        removeLocalStorage()
        updateTableList()
        setSelectedAllRowIds([])
      }
    }
  }, [osDataAdded])

  return (
    <>
      <DataTable
        rows={mappedDataServiceOrders(serviceOrdersStore)}
        columns={columns}
        pageSize={10}
        checkboxSelection
        //setCellClick={setIsRowSelected}
        setSelectedAllRowIds={setSelectedAllRowIds}
      />
      {!!isOpenModalInformation && (
        <ModalInformation
          open={isOpenModalInformation}
          setOpen={setIsOpenModalInformation}
          text='Aguarde enquanto o sistema está processando e gerando os arquivos
          PDF na pasta do Google Drive.'
        />
      )}
    </>
  )
}

export default TableView
