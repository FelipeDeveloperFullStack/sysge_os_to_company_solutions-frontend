import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { formatInputPrice, formatPrice } from 'src/helpers/formatPrice'
import { ADMINISTRATION_SERVICES } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_TITLE_PAGE, SERVICE_FILTER } from 'src/store/actions'
import { ServiceT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaService } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'
import TableView from './Table'

const CreateService: React.FC = () => {
  const dispatch = useDispatch()

  const { apiAdmin } = useAdmin()
  const [idService, setIdService] = useState('')

  const { control, handleSubmit, setValue, getValues, setError } =
    useForm<ServiceT>({
      shouldUnregister: false,
      resolver: yupResolver(schemaService),
    })

  const history = useHistory()
  const location = useLocation()
  const [valueClear, setValueClear] = useState(0)
  const [laudos, setLaudos] = useState<string[]>([])

  useLayoutEffect(() => {
    scroll(0, 0)
    dispatch({
      type: LAYOUT_TITLE_PAGE,
      payload: {
        title: 'Serviço - Edição',
      },
    })
  }, [])

  useEffect(() => {
    const { description, _id, value, laudoService, laudos } = location?.state
    setValue('description', description)
    setValue('laudoService', laudoService)
    setValue('value', formatPrice(value))
    setLaudos(laudos)
    setIdService(_id)
  }, [])

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

  const onSubmit = async (data: ServiceT) => {
    // if (!laudos.length) {
    //   setError('laudoService', { message: 'Laudo do serviço obrigatório.' })
    //   return
    // }
    try {
      const { clean } = formatInputPrice(data.value)
      await apiAdmin.put(`services/${idService}`, toApi(data, clean, laudos))
      dispatch({
        type: SERVICE_FILTER,
        payload: {},
      })
      history.push(ADMINISTRATION_SERVICES)
      toast.success('Serviço atualizado com sucesso.')
    } catch (error) {
      exceptionHandle(error)
    }
  }

  const onFormatterPrice = (value: string) => {
    const { formated, clean } = formatInputPrice(value)
    setValue('value', formated)
    setValueClear(clean)
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
                label={'Nome do serviço'}
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
              <InputText
                label={'Laudo do serviço'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Button
            textButton="Adicionar Laudo"
            variant="contained"
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
            onClick={() => history.push(ADMINISTRATION_SERVICES)}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateService
