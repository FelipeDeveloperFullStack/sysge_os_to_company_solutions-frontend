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
  const status = JSON.parse(window.localStorage.getItem('selectedButton'))

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

  const setPercentValueToPiece = async () => {
    showMessage(InsertPercentToPiece, { selectedAllRow, onHandleRegisterPiece })
  }

  const checkIfRegister = async () => {
    const isRegister = selectedAllRow.find((item) => item.isRegister)
    if (isRegister) {
      showMessage(ConfirmationToRegisterInPiece, { setPercentValueToPiece })
    } else {
      await setPercentValueToPiece()
    }
  }

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
                  incomesFiltered?.reduce((sum, row) => sum + row.value, 0),
                )}
              </div>
              <div style={{ fontSize: '12px', marginTop: '7px' }}>
                Quantidade de registros encontrados: {incomesFiltered?.length}
              </div>
            </>
          )}
          {!!selectedAllRowIds?.length && (
            <>
              <ButtonGenerateOSContainer>
                <Badge
                  badgeContent={selectedAllRowIds?.length}
                  color={status === 'A PAGAR' ? 'success' : 'warning'}
                >
                  <Button
                    textButton={`Atualizar para ${
                      status === 'A PAGAR' ? 'PAGO' : 'A PAGAR'
                    }`}
                    variant={'outlined'}
                    size="small"
                    icon={status === 'A PAGAR' ? 'update2' : 'update'}
                    color={status === 'A PAGAR' ? 'success' : 'warning'}
                    onClick={onHandleUpdateStatus}
                  />
                </Badge>
              </ButtonGenerateOSContainer>
              {!!selectedAllRow.length && (
                <ButtonGenerateOSContainer>
                  <Badge
                    badgeContent={selectedAllRowIds?.length}
                    color={'primary'}
                  >
                    <Button
                      textButton={'Registrar em Peças'}
                      variant={'outlined'}
                      size="small"
                      icon={'add3'}
                      color={'primary'}
                      onClick={checkIfRegister}
                    />
                  </Badge>
                </ButtonGenerateOSContainer>
              )}
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
