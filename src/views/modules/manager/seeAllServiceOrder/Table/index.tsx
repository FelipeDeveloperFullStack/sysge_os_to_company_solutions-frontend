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
import { useAdmin } from 'src/services/useAdmin'
import { exceptionHandle } from 'src/helpers/exceptions'

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
  const { apiAdmin } = useAdmin()
  const dispatch = useDispatch()
  const { closeModal, showSimple } = useModal()
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
          idFileCreatedGoogleDrive: item.idFileCreatedGoogleDrive,
          clientId: item.client.id,
          user: item.user || ''
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

  const mergePDF = async (clientName: string, idClient: string, length: number) => {
    try {
      await apiAdmin.post(`orderServices/merge-pdf`, {
        clientName,
        idClient,
        length
      })
    } catch (error) {
      exceptionHandle(error)
    }
  }

  useEffect(() => {
    if (osDataAdded) {
      const oSData = JSON.parse(window.localStorage.getItem('oSData'))
      if (osDataAdded?.length === oSData?.length) {
        setIsOpenModalInformation(false)
        showSimple.warning('Aguardando a inicialização do processo de unificação, por favor aguarde...', false)
        removeLocalStorage()
        updateTableList()
        setSelectedAllRowIds([])
        if (oSData.length > 1) {
          setTimeout(() => {
            closeModal()
            const clientName = oSData[0]?.client?.name
            const clientId = oSData[0]?.client?.id
            mergePDF(String(clientName).trim(), clientId, oSData?.length)
          }, 30000)
        }
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
        isShowCheckbox
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
