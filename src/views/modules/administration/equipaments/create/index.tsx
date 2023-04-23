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
import { useModal } from 'src/hooks/useModal'
import { ADMINISTRATION_EQUIPAMENTS } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import {
  EQUIPAMENT_FILTER,
  EQUIPAMENT_SEE_ALL,
  LAYOUT_MAKE_REQUEST,
  LAYOUT_TITLE_PAGE,
} from 'src/store/actions'
import { EquipamentT } from 'src/store/Types'
import { Row } from 'src/styles'
import { fromApi } from '../adapters'
import { schemaBrand } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'

type CreateEquipamentProps = {
  isNewServiceByOS?: boolean
}

const CreateEquipament: React.FC<CreateEquipamentProps> = ({
  isNewServiceByOS,
}) => {
  const dispatch = useDispatch()
  const { apiAdmin } = useAdmin()
  const { closeModal } = useModal()

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

  const getEquipaments = async () => {
    try {
      const response = await apiAdmin.get(`equipaments`, {
        params: {
          equipamentName: undefined,
          brand: undefined,
          model: undefined,
          serialNumber: undefined,
        },
      })
      dispatch({
        type: EQUIPAMENT_SEE_ALL,
        payload: await fromApi(response),
      })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar os equipamentos, atualize a página e tente novamente.',
      )
    }
  }

  const onSubmit = async (data: EquipamentT) => {
    try {
      await apiAdmin.post(`equipaments`, toApi(data))
      dispatch({
        type: EQUIPAMENT_FILTER,
        payload: {},
      })
      toast.success('Equipamento cadastrado com sucesso.')
      if (isNewServiceByOS) {
        await getEquipaments()
        closeModal()
        dispatch({
          type: LAYOUT_MAKE_REQUEST,
          payload: {
            makeRequest: Math.random(),
          },
        })
      } else {
        history.push(ADMINISTRATION_EQUIPAMENTS)
      }
    } catch (error) {
      exceptionHandle(error)
    }
  }

  const onHandleClose = () => {
    if (isNewServiceByOS) {
      closeModal()
    } else {
      history.push(ADMINISTRATION_EQUIPAMENTS)
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
            onClick={onHandleClose}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateEquipament
