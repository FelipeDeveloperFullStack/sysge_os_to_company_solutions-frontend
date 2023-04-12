import React from 'react'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_MAKE_REQUEST } from 'src/store/actions'
import { PieceT } from 'src/store/Types'
import { ButtonGroup, Container, Text } from './style'

const RemoveConfirmation: React.FC<PieceT> = ({ _id, description }) => {
  const { closeModal } = useModal()
  const { Loading } = useLoading()
  const { apiAdmin } = useAdmin()
  const dispatch = useDispatch()

  const deleteClient = async () => {
    try {
      Loading.turnOn()
      await apiAdmin.delete(`services/${_id}`)
      toast.success(`Serviço ${description} excluído com sucesso!`)
      closeModal()
      dispatch({
        type: LAYOUT_MAKE_REQUEST,
        payload: {
          makeRequest: Math.random(),
        },
      })
    } catch (error) {
      exceptionHandle(
        error,
        `Ops, Houve um erro ao tentar excluir o serviço ${description}, atualize a página e tente novamente.`,
      )
    } finally {
      Loading.turnOff()
    }
  }

  return (
    <Container>
      <Text>Deseja realmente excluir o serviço</Text>
      <Text bold>{description} ?</Text>
      <ButtonGroup>
        <Button
          textButton="Deletar"
          variant="outlined"
          color="error"
          icon="delete"
          onClick={() => deleteClient()}
        />
        <Button
          textButton="Fechar"
          variant="outlined"
          icon="close"
          onClick={() => closeModal()}
        />
      </ButtonGroup>
    </Container>
  )
}

export default RemoveConfirmation
