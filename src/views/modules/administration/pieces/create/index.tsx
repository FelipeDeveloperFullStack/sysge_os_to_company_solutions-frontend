/* eslint-disable no-restricted-globals */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { formatInputPrice } from 'src/helpers/formatPrice'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { ADMINISTRATION_PIECES } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import {
  LAYOUT_MAKE_REQUEST,
  PIECE_FILTER,
  PIECE_SEE_ALL,
} from 'src/store/actions'
import { PieceT } from 'src/store/Types'
import { Row } from 'src/styles'
import { fromApi } from '../adapters'
import ConfirmationToSave from '../messages/ConfirmationToSave'
import { schemaPiece } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'

type CreatePieceProps = {
  isNewServiceByOS?: boolean
}

const CreatePiece: React.FC<CreatePieceProps> = ({ isNewServiceByOS }) => {
  const dispatch = useDispatch()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()
  const { closeModal, showMessage } = useModal()
  const [valueClear, setValueClear] = useState(0)

  const { control, handleSubmit, setValue } = useForm<PieceT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaPiece),
  })

  const history = useHistory()

  const onFormatterPrice = (value: string) => {
    const { formated, clean } = formatInputPrice(value)
    setValue('value', formated)
    setValueClear(clean)
  }

  const clearAllFields = () => {
    setValue('description', '')
    setValue('value', '')
  }

  const getPieces = async () => {
    try {
      const response = await apiAdmin.get(`pieces`, {
        params: {
          description: undefined,
        },
      })
      dispatch({
        type: PIECE_SEE_ALL,
        payload: await fromApi(response),
      })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar as peças, atualize a página e tente novamente.',
      )
    }
  }

  const onSubmit = async (data: PieceT) => {
    try {
      Loading.turnOn()
      await apiAdmin.post(`pieces`, toApi(data, valueClear))
      dispatch({
        type: PIECE_FILTER,
        payload: {},
      })

      toast.success('Peça cadastrada com sucesso.')

      if (isNewServiceByOS) {
        await getPieces()
        closeModal()
        dispatch({
          type: LAYOUT_MAKE_REQUEST,
          payload: {
            makeRequest: Math.random(),
          },
        })
      } else {
        showMessage(ConfirmationToSave, { history, clearAllFields })
      }
    } catch (error) {
      exceptionHandle(error)
    } finally {
      Loading.turnOff()
    }
  }

  const onHandleClose = () => {
    if (isNewServiceByOS) {
      closeModal()
    } else {
      history.push(ADMINISTRATION_PIECES)
    }
  }

  React.useEffect(() => {
    scroll(0, 0)
  }, [])

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {!!isNewServiceByOS && <div>Nova peça</div>}
        <Row columns="5fr 1fr">
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText label={'Nome'} field={field} fieldState={fieldState} />
            )}
          />
          <Controller
            name="value"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label={'Preço'}
                field={field}
                fieldState={fieldState}
                onKeyUp={() => onFormatterPrice(field.value)}
              />
            )}
          />
        </Row>
        <ButtonContainer>
          <Button
            textButton="Salvar"
            variant="contained"
            size="large"
            icon="add"
            type="submit"
          />
          <Button
            textButton="Voltar"
            variant="outlined"
            size="large"
            icon="back"
            onClick={onHandleClose}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreatePiece
