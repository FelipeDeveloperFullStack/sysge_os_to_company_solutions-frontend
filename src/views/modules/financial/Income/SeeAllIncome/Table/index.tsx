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

type TableViewProps = {
  incomesFiltered: Income[]
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

const TableView: React.FC<TableViewProps> = ({
  incomesFiltered,
  setMakeRequest,
}) => {
  const columns = useColumns({ setMakeRequest })
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()
  const { showSimple } = useModal()

  const [selectedAllRow, setSelectedAllRow] = useState<Income[]>(
    [] as Income[],
  )
  const [selectedAllRowIds, setSelectedAllRowIds] = useState<string[]>(
    [] as string[],
  )
  const [totalOrcamentos, setTotalOrcamentos] = useState(0)

  const status = JSON.parse(window.localStorage.getItem('selectedButton'))

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

  React.useEffect(() => {
    getTotalOrcamentos()
  }, [])

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
              selectedAllRow?.reduce((sum, row) => sum + row.valueNumber, 0),
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
    </>
  )
}

export default TableView
