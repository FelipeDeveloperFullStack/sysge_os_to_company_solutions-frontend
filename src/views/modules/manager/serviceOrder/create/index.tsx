/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Autocomplete,
  AutocompleteOptions,
} from 'src/components/Form/Autocomplete'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { formatPrice, formatInputPrice } from 'src/helpers/formatPrice'
import {
  MANAGER_SERVICE_ORDER,
  MANAGER_SERVICE_ORDER_VIEW,
} from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import {
  LAYOUT_TITLE_PAGE,
  SERVICE_FILTER,
  SERVICE_ORDER_CREATE,
} from 'src/store/actions'
import { ClientT, IStore, ServiceOrderT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaServiceOrder } from '../schemaValidation'
import InputCurrency from './components/InputCurrency'
import { useTotalSum } from './hooks/useTotalSum'
import {
  ButtonContainer,
  Container,
  Form,
  InputTextOSNumberDisabled,
} from './style'
import LaudoTechnicalTable from './tables/laudoTechnical'
import PiecesTable from './tables/pieces'
import { Laudo } from './tables/type'
import { ItemPieces, ItemServices } from './type'

const CreateOrderService: React.FC = () => {
  const dispatch = useDispatch()

  const { apiAdmin } = useAdmin()

  const { sum, resetTotal } = useTotalSum()

  const { control, handleSubmit } = useForm<ServiceOrderT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaServiceOrder),
  })

  const [optionClient, setOptionClient] = useState<AutocompleteOptions[]>(
    [] as AutocompleteOptions[],
  )

  const [client, setClient] = useState<AutocompleteOptions>(
    {} as AutocompleteOptions,
  )

  const [manpower, setManpower] = useState('0.00')
  const [isDisableManPower, setIsDisableManPower] = useState(false)
  const [total, setTotal] = useState('0.00')
  const [totalLaudoTech, setTotalLaudoTech] = useState(0)
  const [laudos, setLaudos] = React.useState<Laudo[]>([] as Laudo[])
  const [totalPieces, setTotalPieces] = useState(0)
  const [itemPieces, setItemPieces] = useState<ItemPieces[]>([] as ItemPieces[])
  const [itemServices, setItemServices] = useState<ItemServices[]>(
    [] as ItemServices[],
  )

  const [clickedClientName, setClickedClientName] = useState(
    {} as AutocompleteOptions,
  )

  const [validateErrorMessageClientName, setValidateErrorMessageClientName] =
    useState('')
  const [messageErrorTotal, setMessageErrorTotal] = useState('')

  const getDateCurrent = () => {
    return `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`
  }

  const history = useHistory()

  useLayoutEffect(() => {
    scroll(0, 0)
    dispatch({
      type: LAYOUT_TITLE_PAGE,
      payload: {
        title: 'Order de Serviço - Inclusão',
      },
    })
    dispatch({
      type: SERVICE_ORDER_CREATE,
      payload: {
        laudos: [
          {
            checked: false,
            description: '',
            service: '',
          },
        ],
      },
    })
  }, [])

  useEffect(() => {
    if (clickedClientName) {
      setValidateErrorMessageClientName('')
    }
  }, [clickedClientName])

  const sumTotal = (pieces: ItemPieces[]) => {
    return pieces.reduce((acc, piece) => acc + piece.total, 0)
  }

  useEffect(() => {
    if (itemPieces.length) {
      setTotalPieces(sumTotal(itemPieces))
    } else {
      setTotal('R$ 0,00')
      setTotalPieces(0)
    }
  }, [itemPieces])

  useEffect(() => {
    if (itemServices.length) {
      setTotalLaudoTech(sumTotal(itemServices))
    } else {
      setTotal('R$ 0,00')
      setTotalLaudoTech(0)
    }
  }, [itemServices])

  useEffect(() => {
    setTotal(formatPrice(totalPieces + totalLaudoTech))
  }, [totalPieces, totalLaudoTech])

  useEffect(() => {
    if (total) {
      const { clean } = formatInputPrice(total)
      if (clean > 0) {
        setIsDisableManPower(false)
      } else {
        setIsDisableManPower(true)
      }
    }
    setMessageErrorTotal('')
  }, [total])

  useEffect(() => {
    resetTotal()
    setTotal('R$ 0,00')
  }, [])

  const onSubmit = async (data: ServiceOrderT) => {
    const { clean: totalCleanValue } = formatInputPrice(total)
    if (!clickedClientName?.label) {
      setValidateErrorMessageClientName('Selecione o cliente')
      scroll(0, 0)
      return
    }
    console.log({ totalCleanValue })
    if (totalCleanValue === 0 || totalCleanValue === undefined) {
      setMessageErrorTotal('Total obrigatório!')
      return
    }

    setValidateErrorMessageClientName('')
    setMessageErrorTotal('')

    data = {
      clientName: clickedClientName.label,
      status: 'Pendente',
      ...data,
    }

    const OSData = {
      ...data,
      itemServices,
      laudos,
      itemPieces,
      total,
      manpower: manpower === '' ? 'R$ 0,00' : manpower,
    }

    try {
      //await apiAdmin.post(`orderServices`, toApi(data))
      dispatch({
        type: SERVICE_FILTER,
        payload: {},
      })
      history.push(MANAGER_SERVICE_ORDER_VIEW, { OSData })
      toast.success('Ordem de serviço cadastrada com sucesso.')
    } catch (error) {
      exceptionHandle(error)
    }
  }

  useEffect(() => {
    let cancel: any

    const loadClient = async () => {
      try {
        const { data } = await apiAdmin.get(`clients`, {
          params: {
            name: client.label,
          },

          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })

        const dataMapped = data?.map((val: ClientT) => ({
          value: val._id,
          label: val.name,
        }))

        setOptionClient(dataMapped)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message)
        }
      }
    }

    loadClient()

    return () => cancel && cancel()
  }, [client])

  const handleKeyDownManPower = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace') {
      const { clean: manPowerCleanValue } = formatInputPrice(manpower)
      const { clean: totalCleanValue } = formatInputPrice(total)
      if (manPowerCleanValue !== undefined) {
        setTotal(formatPrice(totalCleanValue - manPowerCleanValue))
      }
    }
    if (event.key === 'Delete') {
      setTotal(formatPrice(totalPieces + totalLaudoTech))
      setManpower('')
    }
  }

  const onKeyUpManpower = () => {
    const { formated, clean } = formatInputPrice(manpower)
    if (clean) {
      setManpower(formated)
      setTotal(() => formatPrice(totalPieces + totalLaudoTech + clean))
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row columns="1fr 6fr 1fr" gap={10}>
          <Controller
            name="osNumber"
            control={control}
            defaultValue="6540"
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Nº OS'}
                field={field}
                fieldState={fieldState}
                disabled
              />
            )}
          />
          <Autocomplete
            label="Cliente"
            value={client}
            setValue={setClient}
            options={optionClient}
            setOptions={setOptionClient}
            setClickedValue={setClickedClientName}
            hasError={!!validateErrorMessageClientName}
            error={validateErrorMessageClientName}
          />
          <Controller
            name="dateOS"
            control={control}
            defaultValue={getDateCurrent()}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Data'}
                field={field}
                fieldState={fieldState}
                disabled
              />
            )}
          />
        </Row>
        <Row columns="repeat(4, 1fr)" marginTop="10px" gap={10}>
          <Controller
            name="equipament"
            control={control}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Equipamento'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Marca'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="model"
            control={control}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Modelo'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="serialNumber"
            control={control}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Nº Série'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
        </Row>
        <Row columns="repeat(4, 1fr)" marginTop="10px" gap={10}>
          <Controller
            name="equipament"
            control={control}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Cabo'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Carregador'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="model"
            control={control}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Quebrado'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="serialNumber"
            control={control}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <InputTextOSNumberDisabled
                label={'Detalhes'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
        </Row>
        <Row columns="1fr" gap={5} marginTop="10px">
          <LaudoTechnicalTable
            setItemServices={setItemServices}
            itemServices={itemServices}
            laudos={laudos}
            setLaudos={setLaudos}
          />
          <PiecesTable setItemPieces={setItemPieces} itemPieces={itemPieces} />
        </Row>
        <Row columns="1fr 1fr" marginTop="10px">
          <InputCurrency
            type="text"
            label="Mão de Obra"
            mask={''}
            value={manpower}
            setValue={setManpower}
            onChange={(event) => setManpower && setManpower(event.target.value)}
            autoComplete="off"
            onKeyUp={onKeyUpManpower}
            onKeyDown={handleKeyDownManPower}
            disabled={isDisableManPower}
          />
          <InputCurrency
            type="text"
            label="Total"
            value={total}
            setValue={setTotal}
            autoComplete="off"
            hasError={!!messageErrorTotal}
            msgError={messageErrorTotal}
            disabled
          />
        </Row>
        <ButtonContainer>
          <Button
            textButton="Gerar ordem de serviço"
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
            onClick={() => history.push(MANAGER_SERVICE_ORDER)}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateOrderService
