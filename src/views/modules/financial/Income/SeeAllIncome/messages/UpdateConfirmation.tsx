import React from 'react'
import { Button } from 'src/components'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import {
  UpdateDeleteConfirmationContainer,
  UpdateConfirmationContainer,
} from './style'
import { toast } from 'src/components/Widgets/Toastify'

type UpdateConfirmationProps = {
  valueFormated: string
  clientName: string
  id: string
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

export const UpdateConfirmation: React.FC<UpdateConfirmationProps> = ({
  clientName,
  id,
  valueFormated,
  setMakeRequest,
}) => {
  const { closeModal } = useModal()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()

  const confirmation = () => {
    try {
      Loading.turnOn()
      apiAdmin.put(`orderServices/${id}`, { status: 'PAGO' })
      setMakeRequest(Math.random())
      toast.success('Receita financeira atualizada com sucesso.')
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
    <UpdateConfirmationContainer>
      <div>
        Deseja realmente atualizar o status desse registro financeiro para
        Recebido?
      </div>
      <div>Cliente: {clientName}</div>
      <div>Valor: {valueFormated}</div>
      <div>
        <b>Ao clicar em SIM o procedimento não poderá ser desfeito.</b>
      </div>
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
    </UpdateConfirmationContainer>
  )
}
