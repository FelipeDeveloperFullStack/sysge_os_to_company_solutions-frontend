/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Expense } from './adapter'
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
import ConfirmationToRegisterInPiece from '../messages/ConfirmationToSave'
import { InsertPercentToPiece } from '../messages/InsertPercentToPiece'

type TableViewProps = {
  incomesFiltered: Expense[]
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

const TableView: React.FC<TableViewProps> = ({
  incomesFiltered,
  setMakeRequest,
}) => {
  const columns = useColumns({ setMakeRequest })
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()
  const { showSimple, showMessage } = useModal()

  const [selectedAllRowIds, setSelectedAllRowIds] = useState<string[]>(
    [] as string[],
  )
  const [selectedAllRow, setSelectedAllRow] = useState<Expense[]>(
    [] as Expense[],
  )
  const status = JSON.parse(
    window.localStorage.getItem('selectedButtonExpense'),
  )

  const mappedIncomeFinancial = (serviceOrder: Expense[]): Expense[] => {
    return serviceOrder.map((item: Expense) => item)
  }

  const [_, setSuccessRegistrationData] = useLocalStorage(
    'successRegistrationData',
    [],
  )

  const updateStatus = async (id: string) => {
    try {
      await apiAdmin.put(`expense/${id}`, {
        status: status === 'A PAGAR' ? 'PAGO' : 'A PAGAR',
      })
    } catch (error) {
      toast.error(
        'Opss! Ocorreu um erro ao tentar atualiza o status do registro financeiro.',
      )
    }
  }
  const updateRegiterPiece = async (expense: Expense) => {
    try {
      const { data } = await apiAdmin.post(`pieces/register`, {
        description: expense.expense,
        value: expense.value,
      })
      if (data.status === 201) {
        setSuccessRegistrationData((item) => [...item, data])
      }
    } catch ({ response }) {
      if (response?.status === 403) {
        toast.error(response?.data?.message)
      } else {
        toast.error(
          'Opss! Ocorreu um erro ao tentar atualiza o status do registro financeiro.',
        )
      }
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
          `${selectedAllRowIds.length} registros registrados em peças com sucesso.`,
        )
      }
    }
  }

  const onHandleRegisterPiece = async (selectedAllRow: Expense[]) => {
    let index = 0
    window.localStorage.removeItem('successRegistrationData')
    Loading.turnOn()
    for (index; index < selectedAllRow.length; index++) {
      const expense = selectedAllRow[index]
      await updateRegiterPiece(expense)
      if (index === selectedAllRow.length - 1) {
        Loading.turnOff()
        setMakeRequest(Math.random())
        const successRegistrationDataResult = JSON.parse(
          window.localStorage.getItem('successRegistrationData'),
        )
        const message =
          successRegistrationDataResult.length > 1
            ? 'registros registrados em peças com sucesso'
            : 'registro registrado em peças com sucesso'
        if (successRegistrationDataResult.length) {
          showSimple.success(
            `${successRegistrationDataResult.length} ${message}`,
          )
        }
      }
    }
  }

  // const setPercentValueToPiece = async () => {
  //   showMessage(InsertPercentToPiece, { selectedAllRow, onHandleRegisterPiece })
  // }

  // const checkIfRegister = async () => {
  //   const isRegister = selectedAllRow.find((item) => item.isRegister)
  //   if (isRegister) {
  //     showMessage(ConfirmationToRegisterInPiece, { setPercentValueToPiece })
  //   } else {
  //     await setPercentValueToPiece()
  //   }
  // }

  React.useEffect(() => {
    return () => {
      window.localStorage.removeItem('successRegistrationData')
    }
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
          {!!incomesFiltered?.length && (
            <>
              <div style={{ marginTop: '7px' }}>
                Total:{' '}
                <b>{formatPrice(
                  incomesFiltered?.reduce((sum, row) => sum + row.value, 0),
                )}</b>
              </div>
              <div style={{ marginTop: '7px' }}>
                Quantidade de registros encontrados: <b>{incomesFiltered?.length}</b>
              </div>
            </>
          )}
          {!!selectedAllRow.length && <div style={{ marginTop: '7px' }}>
            Total Selecionado:{' '}
            <b>{formatPrice(
              selectedAllRow?.reduce((sum, row) => sum + row.value, 0),
            )}</b>
          </div>}
          {!!selectedAllRowIds?.length && (
            <>
              <ButtonGenerateOSContainer>
                <Button
                  textButton={`Atualizar para ${status === 'A PAGAR' ? 'PAGO' : 'A PAGAR'
                    } (${selectedAllRowIds?.length})`}
                  variant={'outlined'}
                  size="small"
                  icon={status === 'A PAGAR' ? 'update2' : 'update'}
                  color={status === 'A PAGAR' ? 'success' : 'warning'}
                  onClick={onHandleUpdateStatus}
                />
                {/* <Badge
                  badgeContent={selectedAllRowIds?.length}
                  color={status === 'A PAGAR' ? 'success' : 'warning'}
                >
                </Badge> */}
              </ButtonGenerateOSContainer>
            </>
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
