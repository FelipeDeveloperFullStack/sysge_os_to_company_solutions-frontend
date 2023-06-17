/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Income } from './adapter'
import { useColumns } from './Columns'
import { DataTable } from 'src/components/Widgets/DataTable'
import { formatPrice } from 'src/helpers/formatPrice'
import { useAdmin } from 'src/services/useAdmin'
import { useLoading } from 'src/hooks/useLoading'
import { toast } from 'src/components/Widgets/Toastify'
import { useModal } from 'src/hooks/useModal'
import { ButtonGenerateOSContainer } from './Styles'
import Badge from '@mui/material/Badge'
import { Button } from 'src/components'
import useLocalStorage from 'use-local-storage'
import { OSData } from 'src/views/modules/manager/serviceOrder/create/type'
import { exceptionHandle } from 'src/helpers/exceptions'
import { ModalPDF } from 'src/views/modules/manager/seeAllServiceOrder/messages/ModalPDF'
import { ModalInformation } from 'src/views/modules/manager/seeAllServiceOrder/messages/ModalInformation'
import { LAYOUT_MAKE_REQUEST } from 'src/store/actions'
import { useDispatch } from 'react-redux'

type TableViewProps = {
  incomesFiltered: Income[]
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

const TableView: React.FC<TableViewProps> = ({
  incomesFiltered,
  setMakeRequest,
}) => {
  const dispatch = useDispatch()
  const columns = useColumns({ setMakeRequest })
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()
  const { showSimple, showMessage, closeModal } = useModal()
  const osDataAdded = JSON.parse(window.localStorage.getItem('osDataAdded'))
  const [selectedAllRow, setSelectedAllRow] = useState<Income[]>(
    [] as Income[],
  )
  const [selectedAllRowIds, setSelectedAllRowIds] = useState<string[]>(
    [] as string[],
  )
  const [totalOrcamentos, setTotalOrcamentos] = useState(0)
  const [isOpenModalInformation, setIsOpenModalInformation] = useState(false)
  const status = JSON.parse(window.localStorage.getItem('selectedButton'))
  const [oSData, setOSData] = useLocalStorage<OSData[]>(
    'oSData',
    [] as OSData[],
  )

  const mappedIncomeFinancial = (serviceOrder: Income[]): Income[] => {
    return serviceOrder
      .map((item: Income) => item)
      .sort((a, b) => Number(b.osNumber) - Number(a.osNumber))
  }

  const updateStatus = async (id: string) => {
    try {
      await apiAdmin.put(`orderServices/${id}`, {
        status: status === 'PENDENTE' ? 'PAGO' : 'PENDENTE',
      })
    } catch (error) {
      toast.error(
        'Opss! Ocorreu um erro ao tentar atualiza o status do registro financeiro.',
      )
    }
  }

  const onHandleUpdateStatus = async () => {
    let index = 0
    Loading.turnOn()
    for (index; index < selectedAllRowIds.length; index++) {
      const id = selectedAllRowIds[index]
      await updateStatus(id)
      if (index === selectedAllRowIds.length - 1) {
        Loading.turnOff()
        setMakeRequest(Math.random())
        showSimple.success(
          `${selectedAllRowIds.length} registros atualizados com sucesso.`,
        )
      }
    }
    await onHandleGenerateOS()
  }

  const getTotalOrcamentos = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('orderServices/total/orcamentos')
      setTotalOrcamentos(data?.total)
    } catch (error) {
      toast.error('Um erro ocurreu ao tentar buscar os dados de receitas')
    } finally {
      Loading.turnOff()
    }
  }

  const onHandleGeneratePDF = async (id: string) => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get(`orderServices/${id}`)
      //setOSData((previousState) => [...previousState, data])
      return data
    } catch (error) {
      exceptionHandle(
        error,
        'Opss! Houve um erro.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  const onHandleGenerateOS = async () => {
    setOSData([])
    let index = 0
    const list = []
    for (index; index < selectedAllRowIds.length;) {
      const item = selectedAllRowIds[index]
      const result = await onHandleGeneratePDF(item)
      list.push(result)
      //const data = JSON.parse(window.localStorage.getItem('oSData'))
      showMessage(ModalPDF, { oSData: list })
      setIsOpenModalInformation(true)
      index++
      if (index === selectedAllRowIds.length - 1) { }
    }
  }

  const removeLocalStorage = () => {
    window.localStorage.removeItem('oSData')
    window.localStorage.removeItem('osDataAdded')
  }

  const updateTableList = () => {
    dispatch({
      type: LAYOUT_MAKE_REQUEST,
      payload: {
        makeRequest: Math.random(),
      },
    })
  }

  React.useEffect(() => {
    getTotalOrcamentos()
    return () => {
      removeLocalStorage()
    }
  }, [])

  React.useEffect(() => {
    if (!incomesFiltered.length) {
      setSelectedAllRow([])
    }
  }, [incomesFiltered])

  React.useEffect(() => {
    if (osDataAdded) {
      const oSData = JSON.parse(window.localStorage.getItem('oSData'))
      if (osDataAdded?.length === oSData?.length) {
        setIsOpenModalInformation(false)
        closeModal()
        removeLocalStorage()
        updateTableList()
        setSelectedAllRowIds([])
        setSelectedAllRow([])
      }
    }
  }, [osDataAdded])


  return (
    <>
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            gap: '20px',
            paddingTop: !!selectedAllRowIds?.length ? '' : '9px',
            paddingBottom: !!selectedAllRowIds?.length ? '' : '9px'
          }}
        >
          <div style={{ fontSize: '16px', marginTop: '7px' }}>
            Orçamentos:{' '}
            <b>{formatPrice(totalOrcamentos)}</b>
          </div>
          {!!incomesFiltered?.length && (
            <>
              <div style={{ fontSize: '16px', marginTop: '7px' }}>
                Total:{' '}
                <b>{formatPrice(
                  incomesFiltered?.reduce(
                    (sum, row) => sum + row.valueNumber,
                    0,
                  ),
                )}</b>
              </div>
              <div style={{ fontSize: '16px', marginTop: '7px' }}>
                Quantidade de registros encontrados: <b>{incomesFiltered?.length}</b>
              </div>
            </>
          )}
          {!!selectedAllRow.length && <div style={{ marginTop: '7px' }}>
            Total Selecionado:{' '}
            <b>{formatPrice(
              selectedAllRow.filter((item) => item.situation === status)?.reduce((sum, row) => sum + row.valueNumber, 0),
            )}</b>
          </div>}
          {!!selectedAllRowIds?.length && (
            <ButtonGenerateOSContainer>
              <Button
                textButton={`Atualizar para ${status === 'PENDENTE' ? 'RECEBIDO' : 'PENDENTE'
                  } (${selectedAllRowIds?.length})`}
                variant={'outlined'}
                size="small"
                icon={status === 'PENDENTE' ? 'update2' : 'update'}
                color={status === 'PENDENTE' ? 'success' : 'warning'}
                onClick={onHandleUpdateStatus}
              />
            </ButtonGenerateOSContainer>
          )}
        </div>
      </>
      <DataTable
        rows={mappedIncomeFinancial(incomesFiltered)}
        columns={columns}
        pageSize={10}
        checkboxSelection
        setSelectedAllRowIds={setSelectedAllRowIds}
        setCellClick={setSelectedAllRow}
      />
      {!!isOpenModalInformation && (
        <ModalInformation
          open={isOpenModalInformation}
          setOpen={setIsOpenModalInformation}
          text='Aguarde enquanto o sistema está processando e movendo os arquivos
          PDF na pasta do Google Drive.'
        />
      )}
    </>
  )
}

export default TableView
