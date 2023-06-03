import React from 'react'
import { Button } from 'src/components'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import {
  UpdateDeleteConfirmationContainer,
  NewExpenseContainer,
  Text,
} from './style'
import { toast } from 'src/components/Widgets/Toastify'
import Alert from '@mui/material/Alert'

type UpdateConfirmationProps = {
  valueFormated: string
  expense: string
  id: string
  situation: string
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

export const UpdateConfirmation: React.FC<UpdateConfirmationProps> = ({
  expense,
  id,
  valueFormated,
  situation,
  setMakeRequest,
}) => {
  const { closeModal } = useModal()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()

  const changeSituation = () => {
    return situation === 'A PAGAR' ? 'PAGO' : 'A PAGAR'
  }

  const confirmation = async () => {
    try {
      Loading.turnOn()
      await apiAdmin.put(`expense/${id}`, { status: changeSituation() })
      setMakeRequest(Math.random())
      toast.success('Despesa financeira atualizada com sucesso.')
    } catch (error) {
      toast.error(
        'Opss! Ocorreu um erro ao tentar atualiza o status do registro financeiro.',
      )
    } finally {
      Loading.turnOff()
      closeModal()
    }
  }

  const cancel = () => {
    closeModal()
  }

  return (
    <NewExpenseContainer>
      <Text>
        Deseja realmente atualizar o status desse registro financeiro para{' '}
        <b>{changeSituation()}</b>?
      </Text>
      <p />
      <Alert severity="info">Despesa: {expense}</Alert>
      <Alert severity="info">Valor: {valueFormated}</Alert>
      {/* <Alert severity="warning">
        <b>Ao clicar em SIM o procedimento não poderá ser desfeito.</b>
      </Alert> */}
      <UpdateDeleteConfirmationContainer>
        <Button
          textButton="Sim"
          variant="outlined"
          size="large"
          icon="add2"
          onClick={confirmation}
        />
        <Button
          textButton="Não"
          variant="outlined"
          size="large"
          icon="close"
          color="error"
          onClick={cancel}
        />
      </UpdateDeleteConfirmationContainer>
    </NewExpenseContainer>
  )
}
