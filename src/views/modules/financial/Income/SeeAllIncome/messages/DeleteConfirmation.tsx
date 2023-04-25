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

type DeleteConfirmationProps = {
  osNumber: number
  valueFormated: string
  clientName: string
  id: string
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  clientName,
  id,
  osNumber,
  valueFormated,
  setMakeRequest,
}) => {
  const { closeModal } = useModal()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()

  const confirmation = async () => {
    try {
      Loading.turnOn()
      await apiAdmin.delete(`orderServices/${id}`)
      setMakeRequest(Math.random())
      toast.success('Receita financeira excluída com sucesso.')
    } catch (error) {
      toast.error(
        'Opss! Ocorreu um erro ao tentar excluir o registro financeiro.',
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
      <div>Deseja realmente excluir essa receita?</div>
      <div>Cliente: {clientName}</div>
      <div>Valor: {valueFormated}</div>
      <div>
        Ao clicar em SIM a ordem de serviço de Nº {osNumber} também será
        excluída do sistema.
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
