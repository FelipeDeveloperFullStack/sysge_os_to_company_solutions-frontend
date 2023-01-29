/* eslint-disable no-restricted-globals */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { ADMINISTRATION_EQUIPAMENTS } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { EQUIPAMENT_FILTER, LAYOUT_TITLE_PAGE } from 'src/store/actions'
import { EquipamentT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaBrand } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'

const CreateBrand: React.FC = () => {
  const dispatch = useDispatch()

  const { apiAdmin } = useAdmin()

  const { control, handleSubmit } = useForm<EquipamentT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaBrand),
  })

  const history = useHistory()

  useLayoutEffect(() => {
    scroll(0, 0)
    dispatch({
      type: LAYOUT_TITLE_PAGE,
      payload: {
        title: 'Equipamento - Inclusão',
      },
    })
  }, [])

  const onSubmit = async (data: EquipamentT) => {
    try {
      await apiAdmin.post(`equipaments`, toApi(data))
      dispatch({
        type: EQUIPAMENT_FILTER,
        payload: {},
      })
      history.push(ADMINISTRATION_EQUIPAMENTS)
      toast.success('Equipamento cadastrado com sucesso.')
    } catch (error) {
      exceptionHandle(error)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row columns="1fr">
          <Controller
            name="equipamentName"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label={'Equipamento'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
        </Row>
        <Row columns="repeat(3, 1fr)" marginTop="10px">
          <Controller
            name="brand"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label={'Marca'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="model"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label={'Modelo'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="serialNumber"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label={'Nº de série'}
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
            onClick={() => history.push(ADMINISTRATION_EQUIPAMENTS)}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateBrand
