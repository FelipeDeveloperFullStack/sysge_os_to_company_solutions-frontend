import { yupResolver } from '@hookform/resolvers/yup'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { ADMINISTRATION_MODELS } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_TITLE_PAGE, MODEL_FILTER } from 'src/store/actions'
import { ModelT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaModel } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'

const CreateModel: React.FC = () => {
  const dispatch = useDispatch()

  const { apiAdmin } = useAdmin()

  const { control, handleSubmit } = useForm<ModelT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaModel),
  })

  const history = useHistory()

  useLayoutEffect(() => {
    scroll(0, 0)
    dispatch({
      type: LAYOUT_TITLE_PAGE,
      payload: {
        title: 'Modelo - Inclusão',
      },
    })
  }, [])

  const onSubmit = async (data: ModelT) => {
    try {
      await apiAdmin.post(`models`, toApi(data))
      dispatch({
        type: MODEL_FILTER,
        payload: {},
      })
      history.push(ADMINISTRATION_MODELS)
      toast.success('Modelo cadastrado com sucesso.')
    } catch (error) {
      exceptionHandle(error)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row columns="1fr">
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label={'Nome do modelo'}
                field={field}
                fieldState={fieldState}
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
            onClick={() => history.push(ADMINISTRATION_MODELS)}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateModel
