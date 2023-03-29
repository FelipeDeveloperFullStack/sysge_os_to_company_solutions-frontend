/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Autocomplete,
  AutocompleteOptions,
} from 'src/components/Form/Autocomplete'
import { formatInputPrice, formatPrice } from 'src/helpers/formatPrice'
import { IStore, ServiceT } from 'src/store/Types'
import { Row } from 'src/styles'
import InputText from '../../../../components/InputCurrency'
import { useTotalSum } from '../../../../hooks/useTotalSum'
import hasNumber from 'src/helpers/hasNumber'
import axios from 'axios'
import { useAdmin } from 'src/services/useAdmin'
import { ItemServices } from '../../../../type'

type ItemLaudoTechnicalProps = {
  itemServices: ItemServices[]
  setItemServices: React.Dispatch<React.SetStateAction<ItemServices[]>>
  setClickedValue: React.Dispatch<React.SetStateAction<AutocompleteOptions>>
}

export const ItemLaudoTechnical: React.FC<ItemLaudoTechnicalProps> = ({
  setClickedValue,
  itemServices,
  setItemServices,
}) => {
  const [valueUnit, setValueUnit] = useState('')
  const [msgError, setMsgError] = useState('')
  const [msgErrorAutoComplete, setMsgErrorAutoComplete] = useState('')
  const [totalValue, setTotalValue] = useState('')
  const [itemAutocompleteClicked, setItemAutocompleteClicked] = useState('')
  const [qtdeValue, setQtdeValue] = useState('')
  const { sum } = useTotalSum()
  const { apiAdmin } = useAdmin()
  const [optionLaudoTech, setOptionLaudoTech] = useState<AutocompleteOptions[]>(
    [] as AutocompleteOptions[],
  )
  const [valueLaudoTech, setValueLaudoTech] = useState<AutocompleteOptions>(
    {} as AutocompleteOptions,
  )

  const addValueArrayLaudoTech = (itemPiece: ItemServices) => {
    setItemServices((previousState) => [
      ...previousState.filter(
        (item: ItemServices) => item.id !== valueLaudoTech.value,
      ),
      itemPiece,
    ])
  }

  const calcPrice = (qtde: string) => {
    if (qtde?.trim() !== '') {
      const resultCalc = Number(qtde) * Number(services?.value)
      setTotalValue(formatPrice(resultCalc))
      setMsgError('')
      sum(resultCalc)
      addValueArrayLaudoTech({
        description: valueLaudoTech.label,
        id: String(valueLaudoTech.value),
        qtde: Number(qtde),
        total: resultCalc,
        unit: services?.value,
      })
    } else {
      setTotalValue(formatPrice(services?.value))
      setMsgError('Obrigatório!')
      sum(services?.value)
    }
  }

  const handleRemoveItem = () => {
    setItemServices((previousState) => [
      ...previousState.filter(
        (item) => item.description !== itemAutocompleteClicked,
      ),
    ])
  }

  const handleChange = (qtde: string) => {
    if (hasNumber(qtde)) {
      calcPrice(qtde)
    } else {
      setQtdeValue('')
    }
  }

  const services = useSelector(
    (state: IStore) =>
      state.service.services.filter(
        (service) => service._id === valueLaudoTech?.value,
      )[0],
  )

  const clearValues = () => {
    setQtdeValue('')
    setValueUnit('')
    setTotalValue('')
  }

  useEffect(() => {
    if (services?.value) {
      setItemServices((previousState) => {
        const result = previousState.filter(
          (item: ItemServices) => item.description === valueLaudoTech.label,
        )
        handleRemoveItem()
        if (!result.length) {
          setValueUnit(formatPrice(services?.value))
          setQtdeValue('1')
          calcPrice('1')
          addValueArrayLaudoTech({
            description: valueLaudoTech.label,
            id: String(valueLaudoTech.value),
            qtde: 1,
            total: Number(services?.value),
            unit: services?.value,
          })
          setMsgErrorAutoComplete('')
        } else {
          setMsgErrorAutoComplete(
            'Esse serviço já foi adicionado, escolha outro.',
          )
          clearValues()
        }
        return previousState
      })
    } else {
      setMsgErrorAutoComplete('')
      clearValues()
      handleRemoveItem()
    }
  }, [valueLaudoTech])

  useEffect(() => {
    let cancel: any

    const loadLaudoTech = async () => {
      try {
        const { data } = await apiAdmin.get(`services`, {
          params: {
            description:
              (valueLaudoTech.value === 0 && valueLaudoTech.label) || undefined,
          },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })

        const dataMapped = data?.map((val: ServiceT) => ({
          value: val._id,
          label: val.description,
        }))

        setOptionLaudoTech(dataMapped)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message)
        }
      }
    }
    loadLaudoTech()

    return () => cancel && cancel()
  }, [valueLaudoTech])

  const onFormatterPrice = (value: string) => {
    const { formated } = formatInputPrice(value)
    setValueUnit(formated)
  }

  const onHandleSelectedAutocomplete = ({ target }) => {
    if (!msgErrorAutoComplete) {
      setItemAutocompleteClicked(target.defaultValue)
    }
  }

  return (
    <Row columns="5fr 1fr 1fr 1fr" gap={10} marginTop="5px">
      <Autocomplete
        value={valueLaudoTech}
        setValue={setValueLaudoTech}
        options={optionLaudoTech}
        setOptions={setOptionLaudoTech}
        setClickedValue={setClickedValue}
        hasError={!!msgErrorAutoComplete}
        error={msgErrorAutoComplete}
        onSelect={onHandleSelectedAutocomplete}
      />
      <InputText
        value={qtdeValue}
        mask={''}
        disabled={
          services?.value === undefined || !!msgErrorAutoComplete ? true : false
        }
        setValue={setQtdeValue}
        onChange={(event) => setQtdeValue && setQtdeValue(event.target.value)}
        onKeyUp={() => handleChange(qtdeValue)}
        hasError={!!msgError}
        msgError={msgError}
      />
      <InputText
        type="text"
        label={''}
        value={valueUnit}
        autoComplete="off"
        onChange={(event) => setValueUnit && setValueUnit(event.target.value)}
        onKeyUp={() => onFormatterPrice(valueUnit)}
        disabled
      />
      <InputText
        type="text"
        label={''}
        value={totalValue}
        autoComplete="off"
        disabled
      />
    </Row>
  )
}
