import React from 'react'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_MAKE_REQUEST } from 'src/store/actions'
import { BrandT } from 'src/store/Types'
import { ButtonGroup, Container, Text } from './style'

const RemoveConfirmation: React.FC<BrandT> = ({ _id, description }) => {
  const { closeModal } = useModal()
  const { Loading } = useLoading()
  const { apiAdmin } = useAdmin()
  const dispatch = useDispatch()

  const deleteModel = async () => {
    try {
      Loading.turnOn()
      await apiAdmin.delete(`brands/${_id}`)
      toast.success(`Marca ${description} excluída com sucesso!`)
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
        `Ops, Houve um erro ao tentar excluir a marca ${description}, atualize a página e tente novamente.`,
      )
    } finally {
      Loading.turnOff()
    }
  }

  return (
    <Container>
      <Text>Deseja realmente excluir a marca</Text>
      <Text bold>{description} ?</Text>
      <ButtonGroup>
        <Button
          textButton="Deletar"
          variant="contained"
          color="error"
          icon="delete"
          onClick={() => deleteModel()}
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
