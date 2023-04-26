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
import { ADMINISTRATION_SERVICES } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import {
  LAYOUT_MAKE_REQUEST,
  SERVICE_FILTER,
  SERVICE_SEE_ALL,
} from 'src/store/actions'
import { ServiceT } from 'src/store/Types'
import { Row } from 'src/styles'
import { fromApi } from '../adapters'
import { schemaService } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'
import TableView from './Table'

type CreateServiceProps = {
  isNewServiceByOS?: boolean
}

const CreateService: React.FC<CreateServiceProps> = ({
  isNewServiceByOS = false,
}) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()

  const { control, handleSubmit, setValue, getValues, setError } =
    useForm<ServiceT>({
      shouldUnregister: false,
      resolver: yupResolver(schemaService),
    })

  const [valueClear, setValueClear] = useState(0)
  const [laudos, setLaudos] = useState<string[]>([])

  const history = useHistory()

  const getServices = async () => {
    try {
      const response = await apiAdmin.get(`services`, {
        params: {
          description: undefined,
        },
      })
      dispatch({
        type: SERVICE_SEE_ALL,
        payload: await fromApi(response),
      })
    } catch (error) {
      exceptionHandle(
        error,
        'Ops! Houve um erro ao tentar buscar os servicos, atualize a página e tente novamente.',
      )
    }
  }

  const onSubmit = async (data: ServiceT) => {
    // if (!laudos.length) {
    //   setError('laudoService', { message: 'Laudo do serviço obrigatório.' })
    //   return
    // }
    try {
      Loading.turnOn()
      await apiAdmin.post(`services`, toApi(data, valueClear, laudos))
      dispatch({
        type: SERVICE_FILTER,
        payload: {},
      })
      toast.success('Serviço cadastrado com sucesso.')
      if (isNewServiceByOS) {
        await getServices()
        closeModal()
        dispatch({
          type: LAYOUT_MAKE_REQUEST,
          payload: {
            makeRequest: Math.random(),
          },
        })
      } else {
        history.push(ADMINISTRATION_SERVICES)
      }
    } catch (error) {
      exceptionHandle(error)
    } finally {
      Loading.turnOff()
    }
  }

  const onFormatterPrice = (value: string) => {
    const { formated, clean } = formatInputPrice(value)
    setValue('value', formated)
    setValueClear(clean)
  }

  const addLaudo = () => {
    const { laudoService } = getValues()
    if (!!laudoService) {
      setLaudos([...laudos, laudoService])
      setValue('laudoService', '')
    } else {
      setError('laudoService', {
        message: 'Necessário informar o laudo do serviço.',
      })
    }
  }

  const onHandleClose = () => {
    if (isNewServiceByOS) {
      closeModal()
    } else {
      history.push(ADMINISTRATION_SERVICES)
    }
  }

  React.useEffect(() => {
    scroll(0, 0)
  }, [])

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {!!isNewServiceByOS && <div>Novo serviço</div>}
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
                label={'Valor'}
                field={field}
                fieldState={fieldState}
                onKeyUp={() => onFormatterPrice(field.value)}
              />
            )}
          />
        </Row>
        <Row columns="4fr 1fr" marginTop="10px">
          <Controller
            name="laudoService"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <InputText
                  label={'Laudo do serviço'}
                  field={field}
                  fieldState={fieldState}
                  toUpperCase={false}
                />
              </>
            )}
          />
          <Button
            textButton="Adicionar Laudo"
            variant="outlined"
            size="small"
            icon="add2"
            onClick={addLaudo}
          />
        </Row>
        <Row columns="1fr" marginTop="10px">
          <TableView laudos={laudos} setLaudos={setLaudos} />
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

export default CreateService
