/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { yupResolver } from '@hookform/resolvers/yup'
import useLocalStorage from 'use-local-storage'
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
import { Select } from 'src/components/Widgets/Select'
import { exceptionHandle } from 'src/helpers/exceptions'
import { formatPrice, formatInputPrice } from 'src/helpers/formatPrice'
import { MANAGER_SERVICE_ORDER } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_TITLE_PAGE, SERVICE_ORDER_CREATE } from 'src/store/actions'
import { ClientT, IStore, ServiceOrderT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaServiceOrder } from '../schemaValidation'
import { fromApiSerialNumber, toApi } from './adapters'
import InputText from './components/InputCurrency'
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
import { ItemPieces, ItemServices, OSData } from './type'
import { LaunchFinancial } from './messages/LaunchFinancial'
import { useModal } from 'src/hooks/useModal'
import moment from 'moment'
import { useAddLocalStorage } from './hooks/useAddLocalStorage'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CreateClient from 'src/views/modules/administration/clients/create'
import CreateEquipament from 'src/views/modules/administration/equipaments/create'

const CreateOrderService: React.FC = () => {
  const dispatch = useDispatch()

  const { apiAdmin } = useAdmin()

  const equipaments = useSelector(
    (state: IStore) => state.equipament?.equipaments,
  )

  const { resetTotal } = useTotalSum()
  const { showMessage, showSimple } = useModal()

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<ServiceOrderT>({
      shouldUnregister: false,
      resolver: yupResolver(schemaServiceOrder),
    })

  const [cable, setCable] = useLocalStorage('cable', '')
  const [charger, setCharger] = useLocalStorage('charger', '')
  const [breaked, setBreaked] = useLocalStorage('breaked', '')
  const [detail, setDetail] = useLocalStorage('detail', '')
  useAddLocalStorage({
    watch,
    setValue,
    setCable,
    setCharger,
    setBreaked,
    setDetail,
  })

  useEffect(() => {
    setValue('cable', cable)
    setValue('charger', charger)
    setValue('breaked', breaked)
    setValue('detail', detail)
  }, [])

  const [optionClient, setOptionClient] = useState<AutocompleteOptions[]>(
    [] as AutocompleteOptions[],
  )
  const [clients, setClients] = useState<ClientT[]>([] as ClientT[])

  const [client, setClient] = useState<AutocompleteOptions>(
    {} as AutocompleteOptions,
  )
  const [discount, setDiscount] = useState('0')
  const [equipamentsNameOptions, setEquipamentsNameOptions] = useState<
    AutocompleteOptions[]
  >([] as AutocompleteOptions[])
  const [brandOptions, setBrandOptions] = useState<AutocompleteOptions[]>(
    [] as AutocompleteOptions[],
  )
  const [modelOptions, setModelOptions] = useState<AutocompleteOptions[]>(
    [] as AutocompleteOptions[],
  )
  const [serialNumberOptions, setSerialNumberOptions] = useState<
    AutocompleteOptions[]
  >([] as AutocompleteOptions[])

  const [equipamentName, setEquipamentName] = useState(
    {} as AutocompleteOptions,
  )
  const [brand, setBrand] = useState({} as AutocompleteOptions)
  const [model, setModel] = useState({} as AutocompleteOptions)
  const [serialNumber, setSerialNumber] = useState({} as AutocompleteOptions)

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
  const [clickedEquipament, setClickedEquipament] = useState(
    {} as AutocompleteOptions,
  )
  const [clickedBrand, setClickedBrand] = useState({} as AutocompleteOptions)
  const [clickedModel, setClickedModel] = useState({} as AutocompleteOptions)
  const [clickedSerialNumber, setClickedSerialNumber] = useState(
    {} as AutocompleteOptions,
  )
  const [osNumber, setOsNumber] = useLocalStorage('osNumber', '')
  const [validateErrorMessageClientName, setValidateErrorMessageClientName] =
    useState('')
  const [validateErrorMessageEquipament, setValidateErrorMessageEquipament] =
    useState('')
  const [validateErrorMessageBrand, setValidateErrorMessageBrand] = useState('')
  const [validateErrorMessageModel, setValidateErrorMessageModel] = useState('')
  const [
    validateErrorMessageSerialNumber,
    setValidateErrorMessageSerialNumber,
  ] = useState('')
  const [messageErrorTotal, setMessageErrorTotal] = useState('')

  const getDateCurrent = () => {
    const dataAtual = moment()
    const formato = 'DD/MM/YYYY'
    return dataAtual.format(formato)
  }

  const makeRequest = useSelector((state: IStore) => state.layout.makeRequest)

  const history = useHistory()

  useLayoutEffect(() => {
    scroll(0, 0)
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

  useEffect(() => {
    if (clickedEquipament) {
      setValidateErrorMessageEquipament('')
    }
  }, [clickedEquipament])

  useEffect(() => {
    if (clickedBrand) {
      setValidateErrorMessageBrand('')
    }
  }, [clickedBrand])

  useEffect(() => {
    if (clickedModel) {
      setValidateErrorMessageModel('')
    }
  }, [clickedModel])

  useEffect(() => {
    if (clickedSerialNumber) {
      setValidateErrorMessageSerialNumber('')
    }
  }, [clickedSerialNumber])

  const sumTotal = (pieces: ItemPieces[]) => {
    return pieces.reduce((acc, piece) => acc + piece.total, 0)
  }

  const getEquipaments = () => {
    const resultEquipamentsName = equipaments.map((item) => ({
      label: item.equipamentName,
      value: item.equipamentName,
    }))
    const resultBrand = equipaments.map((item) => ({
      label: item.brand,
      value: item.brand,
    }))
    const model = equipaments.map((item) => ({
      label: item.model,
      value: item.model,
    }))
    const resultSerialNumber = fromApiSerialNumber(equipaments)
    setEquipamentsNameOptions(resultEquipamentsName)
    setBrandOptions(resultBrand)
    setModelOptions(model)
    setSerialNumberOptions(resultSerialNumber)
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
    let { clean: totalManPower } = formatInputPrice(manpower)
    if (!totalManPower) {
      totalManPower = 0
    }
    setTotal(formatPrice(totalPieces + totalLaudoTech + totalManPower))
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
    if (Object.values(formState?.errors).some((item) => item)) {
      scroll(0, 0)
    }
  }, [formState?.errors])

  const getNextOsNumber = (data: { osNumber: string }[]): string => {
    const highestNumber = data.reduce((prev, current) => {
      const currentNumber = parseInt(current.osNumber)
      return currentNumber > prev ? currentNumber : prev
    }, 0)
    return highestNumber ? (highestNumber + 1).toString() : '1000'
  }

  const getOSNumber = async () => {
    try {
      const { data } = await apiAdmin.get(`orderServices`)
      setOsNumber(getNextOsNumber(data))
    } catch (error) {
      console.log(error)
      exceptionHandle(error)
    }
  }

  useEffect(() => {
    getOSNumber()
    getEquipaments()
    resetTotal()
    setTotal('R$ 0,00')
    scroll(0, 0)
  }, [])

  // scroll(0, 0)

  // const resetAllField = () => {
  //   getOSNumber()
  //   setTotal('R$ 0,00')
  //   resetTotal()
  //   setClient({} as AutocompleteOptions)
  //   setEquipamentName({} as AutocompleteOptions)
  //   setBrand({} as AutocompleteOptions)
  //   setModel({} as AutocompleteOptions)
  //   setSerialNumber({} as AutocompleteOptions)
  //   setValue('cable', '')
  //   setValue('charger', '')
  //   setValue('breaked', '')
  //   setValue('detail', '')
  //   setItemServices([] as ItemServices[])
  //   setItemPieces([] as ItemPieces[])
  //   setManpower('')
  //   setMakeClearField(Math.random())
  //   scroll(0, 0)
  // }

  const onSubmit = async (data: ServiceOrderT & OSData) => {
    const { clean: totalCleanValue } = formatInputPrice(total)
    if (!clickedClientName?.label) {
      setValidateErrorMessageClientName('Selecione o cliente')
      scroll(0, 0)
      return
    }
    if (!clickedEquipament?.label) {
      setValidateErrorMessageEquipament('Selecione o equipamento')
      scroll(0, 0)
      return
    }
    if (!clickedBrand?.label) {
      setValidateErrorMessageBrand('Selecione a marca')
      scroll(0, 0)
      return
    }
    if (!clickedModel?.label) {
      setValidateErrorMessageModel('Selecione o modelo')
      scroll(0, 0)
      return
    }
    if (!clickedSerialNumber?.label) {
      setValidateErrorMessageSerialNumber('Selecione o número de série')
      scroll(0, 0)
      return
    }

    if (totalCleanValue === 0 || totalCleanValue === undefined) {
      setMessageErrorTotal('Total obrigatório!')
      return
    }

    if (laudos?.length > 6) {
      showSimple.error('A quantidade de laudos não pode ser maior do que 6')
      return
    }

    setValidateErrorMessageClientName('')
    setMessageErrorTotal('')

    const OSData = {
      ...data,
      client: clients.filter(
        (clientItem) => clientItem._id === clickedClientName.value,
      )[0],
      status: 'Pendente',
      itemServices,
      laudos,
      itemPieces,
      total,
      manpower: manpower === '' ? 'R$ 0,00' : manpower,
      equipament: equipamentName.label,
      brand: brand.label,
      model: model.label,
      serialNumber: serialNumber.label,
      osNumber,
    }

    try {
      const resultToApi = toApi(OSData, osNumber)
      // await apiAdmin.post(`orderServices`, toApi(OSData, osNumber))
      // dispatch({
      //   type: SERVICE_FILTER,
      //   payload: {},
      // })
      // history.push(MANAGER_SERVICE_ORDER_VIEW, { OSData })
      // toast.success('Ordem de serviço cadastrada com sucesso.')
      showMessage(LaunchFinancial, {
        data: resultToApi,
        history,
        // resetAllField,
      })
    } catch (error) {
      console.log(error)
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
        setClients(data)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message)
        }
      }
    }

    loadClient()

    return () => cancel && cancel()
  }, [client, makeRequest])

  useEffect(() => {
    if (!equipamentName.label?.toUpperCase()) {
      setEquipamentsNameOptions(
        equipaments.map((item) => ({
          label: item.equipamentName,
          value: item.equipamentName,
        })),
      )
    } else {
      const result = equipaments.filter((item) =>
        item.equipamentName.includes(equipamentName.label?.toUpperCase()),
      )
      setEquipamentsNameOptions(
        result.map((item) => ({
          label: item.equipamentName,
          value: item.equipamentName,
        })),
      )
    }
    if (!brand.label?.toUpperCase()) {
      setBrandOptions(
        equipaments.map((item) => ({
          label: item.brand,
          value: item.brand,
        })),
      )
    } else {
      const result = equipaments.filter((item) =>
        item.brand.includes(brand.label?.toUpperCase()),
      )
      setBrandOptions(
        result.map((item) => ({
          label: item.brand,
          value: item.brand,
        })),
      )
    }
    if (!model.label?.toUpperCase()) {
      setModelOptions(
        equipaments.map((item) => ({
          label: item.model,
          value: item.model,
        })),
      )
    } else {
      const result = equipaments.filter((item) =>
        item.model.includes(model.label?.toUpperCase()),
      )
      setModelOptions(
        result.map((item) => ({
          label: item.model,
          value: item.model,
        })),
      )
    }
    if (!serialNumber.label?.toUpperCase()) {
      // setSerialNumberOptions(
      //   equipaments.map((item) => ({
      //     label: item.serialNumber,
      //     value: item.serialNumber,
      //   })),
      // )
      setSerialNumberOptions(fromApiSerialNumber(equipaments))
    } else {
      const result = fromApiSerialNumber(equipaments).filter((item) =>
        item.label.includes(serialNumber.label?.toUpperCase()),
      )
      setSerialNumberOptions(
        result.map((item) => ({
          label: item.label,
          value: item.value,
        })),
      )
    }
  }, [equipamentName, brand, model, serialNumber, makeRequest])

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
  const handleKeyDownDiscount = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace') {
      setDiscount((previousState) => previousState.replace('%', ''))
      let { clean: totalManPower } = formatInputPrice(manpower)
      if (!totalManPower) {
        totalManPower = 0
      }
      setTotal(formatPrice(totalPieces + totalLaudoTech + totalManPower))
    }
    if (event.key === 'Delete') {
      let { clean: totalManPower } = formatInputPrice(manpower)
      if (!totalManPower) {
        totalManPower = 0
      }
      setTotal(formatPrice(totalPieces + totalLaudoTech + totalManPower))
      setDiscount('')
    }
  }

  const calculateDiscount = () => {
    let { clean: totalManPower } = formatInputPrice(manpower)
    if (!totalManPower) {
      totalManPower = 0
    }
    let totalDiscount = discount.replace('%', '')
    setDiscount(`${totalDiscount}%`)
    let total = totalPieces + totalLaudoTech + totalManPower
    total = total * (1 - Number(totalDiscount) / 100)
    setTotal(() => formatPrice(total))
  }

  const onKeyUpManpower = () => {
    const { formated, clean } = formatInputPrice(manpower)
    if (clean) {
      setManpower(formated)
      if (discount) {
        calculateDiscount()
      } else {
        setTotal(() => formatPrice(totalPieces + totalLaudoTech + clean))
      }
    }
  }

  const onKeyUpDiscount = () => {
    calculateDiscount()
  }

  const onHandleAddNewClient = () => {
    showMessage(
      CreateClient,
      {
        isNewServiceByOS: true,
      },
      true,
    )
  }

  const onHandleAddNewEquipament = () => {
    showMessage(
      CreateEquipament,
      {
        isNewServiceByOS: true,
      },
      true,
    )
  }

  const back = () => {
    history.push(MANAGER_SERVICE_ORDER)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row columns="1fr 6fr 1fr" gap={10}>
          <InputText
            type="text"
            label="Nº OS"
            isCurrencyNumberOnly
            value={osNumber}
            disabled
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
            isUseButton
            iconButtonLabel={<AddCircleOutlineIcon />}
            tooltipMessageButtonLabel="Clique aqui para adicionar um novo cliente."
            onHandleClickButtonLabel={onHandleAddNewClient}
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
          <Autocomplete
            label="Equipamento"
            value={equipamentName}
            setValue={setEquipamentName}
            options={equipamentsNameOptions}
            setOptions={setEquipamentsNameOptions}
            setClickedValue={setClickedEquipament}
            hasError={!!validateErrorMessageEquipament}
            error={validateErrorMessageEquipament}
            isUseButton
            iconButtonLabel={<AddCircleOutlineIcon />}
            tooltipMessageButtonLabel="Clique aqui para adicionar um novo Equipamento."
            onHandleClickButtonLabel={onHandleAddNewEquipament}
          />
          <Autocomplete
            label="Marca"
            value={brand}
            setValue={setBrand}
            options={brandOptions}
            setOptions={setBrandOptions}
            setClickedValue={setClickedBrand}
            hasError={!!validateErrorMessageBrand}
            error={validateErrorMessageBrand}
          />
          <Autocomplete
            label="Modelo"
            value={model}
            setValue={setModel}
            options={modelOptions}
            setOptions={setModelOptions}
            setClickedValue={setClickedModel}
            hasError={!!validateErrorMessageModel}
            error={validateErrorMessageModel}
          />
          <Autocomplete
            label="Nº Série"
            value={serialNumber}
            setValue={setSerialNumber}
            options={serialNumberOptions}
            setOptions={setSerialNumberOptions}
            setClickedValue={setClickedSerialNumber}
            hasError={!!validateErrorMessageSerialNumber}
            error={validateErrorMessageSerialNumber}
          />
        </Row>
        <Row columns="repeat(4, 1fr)" marginTop="10px" gap={10}>
          <Controller
            name="cable"
            control={control}
            defaultValue={''}
            render={({ field, formState }) => (
              <Select
                {...field}
                labelDefaultOption="Selecione"
                label="Cabo"
                hasError={!!formState.errors.cable?.message}
                msgError={formState.errors.cable?.message}
                options={[
                  { label: 'SIM', value: 'SIM' },
                  { label: 'NAO', value: 'NAO' },
                ]}
              />
            )}
          />
          <Controller
            name="charger"
            control={control}
            defaultValue={''}
            render={({ field, formState }) => (
              <Select
                {...field}
                labelDefaultOption="Selecione"
                label="Carregador"
                hasError={!!formState.errors.charger?.message}
                msgError={formState.errors.charger?.message}
                options={[
                  { label: 'SIM', value: 'SIM' },
                  { label: 'NAO', value: 'NAO' },
                ]}
              />
            )}
          />
          <Controller
            name="breaked"
            control={control}
            defaultValue={''}
            render={({ field, formState }) => (
              <Select
                {...field}
                labelDefaultOption="Selecione"
                label="Quebrado"
                hasError={!!formState.errors.breaked?.message}
                msgError={formState.errors.breaked?.message}
                options={[
                  { label: 'SIM', value: 'SIM' },
                  { label: 'NAO', value: 'NAO' },
                ]}
              />
            )}
          />
          <Controller
            name="detail"
            control={control}
            defaultValue={''}
            render={({ field, formState }) => (
              <Select
                {...field}
                labelDefaultOption="Selecione"
                label="Detalhes"
                hasError={!!formState.errors.detail?.message}
                msgError={formState.errors.detail?.message}
                options={[
                  { label: 'SIM', value: 'SIM' },
                  { label: 'NAO', value: 'NAO' },
                ]}
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
        <Row columns="1fr 1fr 1fr" marginTop="10px">
          <InputText
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
          <InputText
            type="text"
            label="Desconto"
            mask={''}
            value={discount}
            setValue={setDiscount}
            onChange={(event) => setDiscount && setDiscount(event.target.value)}
            autoComplete="off"
            onKeyUp={onKeyUpDiscount}
            onKeyDown={handleKeyDownDiscount}
            disabled={isDisableManPower}
            isPercent
          />
          <InputText
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
            textButton="Salvar"
            variant="contained"
            size="large"
            icon="add3"
            type="submit"
          />
          <Button
            textButton="Voltar"
            variant="outlined"
            size="large"
            icon="back"
            onClick={back}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateOrderService
