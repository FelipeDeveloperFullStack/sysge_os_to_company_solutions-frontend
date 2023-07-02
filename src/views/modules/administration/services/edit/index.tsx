/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { formatInputPrice, formatPrice } from 'src/helpers/formatPrice'
import { useModal } from 'src/hooks/useModal'
import { ADMINISTRATION_SERVICES } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_MAKE_REQUEST, SERVICE_FILTER } from 'src/store/actions'
import { ServiceT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaService } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'
import TableView from './Table'

type EditServiceProps = {
  isNewServiceByOS?: boolean
  dataService?: any
  setClearFields?: React.Dispatch<React.SetStateAction<boolean>>
}

const EditService: React.FC<EditServiceProps> = ({ dataService, isNewServiceByOS, setClearFields }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const { apiAdmin } = useAdmin()
  const [idService, setIdService] = useState('')

  const { control, handleSubmit, setValue, getValues, setError } =
    useForm<ServiceT>({
      shouldUnregister: false,
      resolver: yupResolver(schemaService),
    })

  const history = useHistory()
  const location = !isNewServiceByOS ? useLocation() : null
  const [valueClear, setValueClear] = useState(0)
  const [loading, setLoading] = useState(false)
  const [laudos, setLaudos] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const { description, _id, value, laudoService, laudos } = !isNewServiceByOS ? location?.state : dataService
    setValue('description', description)
    setValue('laudoService', laudoService)
    setValue('value', formatPrice(value))
    setLaudos(laudos)
    setIdService(_id)
    scroll(0, 0)
  }, [])

  const addLaudo = () => {
    const { laudoService } = getValues()
    if (!!laudoService) {
      setLaudos([...laudos, laudoService])
      setValue('laudoService', '')
      setError("laudoService", { message: '' })
    } else {
      setError('laudoService', {
        message: 'Necessário informar o laudo do serviço.',
      })
    }
  }

  const onSubmit = async (data: ServiceT) => {
    setError("laudoService", { message: '' })
    if (!laudos.length) {
      setError('laudoService', { message: 'Laudo do serviço obrigatório.' })
      return
    }
    if (data.laudoService) {
      setError('laudoService', { message: 'Laudo do serviço não adicionado, você precisa adicionar o laudo antes de salvar.' })
      return
    }
    try {
      setLoading(true)
      const { clean } = formatInputPrice(data.value)
      await apiAdmin.put(`services/${idService}`, toApi(data, clean, laudos))
      dispatch({
        type: SERVICE_FILTER,
        payload: {},
      })
      if (isNewServiceByOS) {
        closeModal()
        dispatch({
          type: LAYOUT_MAKE_REQUEST,
          payload: {
            makeRequest: Math.random(),
          },
        })
        if (setClearFields) setClearFields(true)
      }
      history.push(ADMINISTRATION_SERVICES)
      toast.success('Serviço atualizado com sucesso.')
    } catch (error) {
      exceptionHandle(error)
      if (isNewServiceByOS) {
        setErrorMessage(error?.response?.data.message)
        if (setClearFields) setClearFields(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const onFormatterPrice = (value: string) => {
    const { formated, clean } = formatInputPrice(value)
    setValue('value', formated)
    setValueClear(clean)
  }

  const onHandleClose = () => {
    if (isNewServiceByOS) {
      closeModal()
      if (setClearFields) setClearFields(false)
    } else {
      history.push(ADMINISTRATION_SERVICES)
    }
  }

  return (
    <Container>
      {!!errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {!!isNewServiceByOS && <div>Editar</div>}
        <Row columns="3fr 1fr">
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
        <Row columns="3fr 1fr" marginTop="10px" alignItems='flex-end'>
          <Controller
            name="laudoService"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label={'Laudo do serviço'}
                field={field}
                fieldState={fieldState}
                toUpperCase={false}
                capitalizeWords
              />
            )}
          />
          <Button
            textButton="Adicionar Laudo"
            variant="outlined"
            size="large"
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
            loading={loading}
          />
          <Button
            textButton={isNewServiceByOS ? "Fechar" : "Voltar"}
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

export default EditService
