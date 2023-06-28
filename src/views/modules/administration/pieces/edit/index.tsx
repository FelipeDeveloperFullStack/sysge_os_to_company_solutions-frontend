/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { formatInputPrice, formatPrice } from 'src/helpers/formatPrice'
import { ADMINISTRATION_PIECES } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_IS_MODIFIED_FIELDS, PIECE_FILTER } from 'src/store/actions'
import { PieceT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaPiece } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'

const CreateClient: React.FC = () => {
  const urlPath = window.location.pathname
  const dispatch = useDispatch()
  const { apiAdmin } = useAdmin()
  const location = useLocation()
  const [idPieces, setIdPieces] = useState()
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, setValue, watch } = useForm<PieceT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaPiece),
  })

  const history = useHistory()
  const description = watch('description')
  const value = watch('value')

  useEffect(() => {
    scroll(0, 0)
    const { description, value, id } = location.state
    setValue('description', description)
    setValue('value', formatPrice(value))
    setIdPieces(id)
    scroll(0, 0)
  }, [])

  const onFormatterPrice = (value: string) => {
    const { formated } = formatInputPrice(value)
    setValue('value', formated)
  }

  const onSubmit = async (data: PieceT) => {
    try {
      setLoading(true)
      const { clean } = formatInputPrice(data?.value)
      await apiAdmin.put(`pieces/${idPieces}`, toApi(data, clean))
      dispatch({
        type: PIECE_FILTER,
        payload: {},
      })
      toast.success('Peça atualizada com sucesso.')
      history.push(ADMINISTRATION_PIECES)
    } catch (error) {
      exceptionHandle(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            loading={loading}
          />
          <Button
            textButton="Voltar"
            variant="outlined"
            size="large"
            icon="back"
            onClick={() => history.push(ADMINISTRATION_PIECES)}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateClient
