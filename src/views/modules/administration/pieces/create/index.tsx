import { yupResolver } from '@hookform/resolvers/yup'
import React, { useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { formatInputPrice } from 'src/helpers/formatPrice'
import { ADMINISTRATION_PIECES } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_TITLE_PAGE, PIECE_FILTER } from 'src/store/actions'
import { PieceT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaPiece } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'

const CreateClient: React.FC = () => {
  const dispatch = useDispatch()

  const { apiAdmin } = useAdmin()

  const [valueClear, setValueClear] = useState(0)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PieceT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaPiece),
  })

  const history = useHistory()

  useLayoutEffect(() => {
    scroll(0, 0)
    dispatch({
      type: LAYOUT_TITLE_PAGE,
      payload: {
        title: 'Peça - Inclusão',
      },
    })
  }, [])

  const onFormatterPrice = (value: string) => {
    const { formated, clean } = formatInputPrice(value)
    setValue('value', formated)
    setValueClear(clean)
  }

  const onSubmit = async (data: PieceT) => {
    try {
      await apiAdmin.post(`pieces`, toApi(data, valueClear))
      dispatch({
        type: PIECE_FILTER,
        payload: {},
      })
      history.push(ADMINISTRATION_PIECES)
      toast.success('Peça cadastrada com sucesso.')
    } catch (error) {
      exceptionHandle(error)
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
              <InputText
                label={'Nome da peça'}
                field={field}
                fieldState={fieldState}
              />
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
            onClick={() => history.push(ADMINISTRATION_PIECES)}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateClient
