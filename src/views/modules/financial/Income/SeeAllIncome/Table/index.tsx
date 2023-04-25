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

  const [selectedAllRowIds, setSelectedAllRowIds] = useState<string[]>(
    [] as string[],
  )
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

  return (
    <>
      <>
        <div
          style={{
            margin: '10px 0px 10px 0px',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'flex',
            gap: '20px',
          }}
        >
          {!!incomesFiltered?.length && (
            <>
              <div style={{ fontSize: '12px', marginTop: '7px' }}>
                Total:{' '}
                {formatPrice(
                  incomesFiltered?.reduce(
                    (sum, row) => sum + row.valueNumber,
                    0,
                  ),
                )}
              </div>
              <div style={{ fontSize: '12px', marginTop: '7px' }}>
                Quantidade de registros encontrados: {incomesFiltered?.length}
              </div>
            </>
          )}
          {!!selectedAllRowIds?.length && (
            <ButtonGenerateOSContainer>
              <Badge
                badgeContent={selectedAllRowIds?.length}
                color={status === 'PENDENTE' ? 'success' : 'warning'}
              >
                <Button
                  textButton={`Atualizar para ${
                    status === 'PENDENTE' ? 'RECEBIDO' : 'PENDENTE'
                  }`}
                  variant={'outlined'}
                  size="small"
                  icon={status === 'PENDENTE' ? 'update2' : 'update'}
                  color={status === 'PENDENTE' ? 'success' : 'warning'}
                  onClick={onHandleUpdateStatus}
                />
              </Badge>
            </ButtonGenerateOSContainer>
          )}
        </div>
      </>
      <DataTable
        rows={mappedIncomeFinancial(incomesFiltered)}
        columns={columns}
        pageSize={5}
        checkboxSelection
        setSelectedAllRowIds={setSelectedAllRowIds}
      />
    </>
  )
}

export default TableView
