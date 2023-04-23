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
import { ItemPieces } from '../../../../type'

type TableViewPiecesProps = {
  setItemPieces: React.Dispatch<React.SetStateAction<ItemPieces[]>>
  itemPieces: ItemPieces[]
}

export const ItemLaudoPieces: React.FC<TableViewPiecesProps> = ({
  setItemPieces,
  itemPieces,
}) => {
  const [valueUnit, setValueUnit] = useState('')
  const [msgError, setMsgError] = useState('')
  const [msgErrorAutoComplete, setMsgErrorAutoComplete] = useState('')
  const [totalValue, setTotalValue] = useState('')
  const [qtdeValue, setQtdeValue] = useState('')
  const [itemAutocompleteClicked, setItemAutocompleteClicked] = useState('')
  const { sum } = useTotalSum()
  const { apiAdmin } = useAdmin()
  const [optionPiece, setOptionPiece] = useState<AutocompleteOptions[]>(
    [] as AutocompleteOptions[],
  )
  const [valuePiece, setValuePiece] = useState<AutocompleteOptions>(
    {} as AutocompleteOptions,
  )
  const makeRequest = useSelector((state: IStore) => state.layout.makeRequest)

  const calcPrice = (qtde: string) => {
    if (qtde?.trim() !== '') {
      const resultCalc = Number(qtde) * Number(pieces?.value)
      setTotalValue(formatPrice(resultCalc))
      setMsgError('')
      sum(resultCalc)
      addValueArrayPieces({
        description: valuePiece.label,
        id: String(valuePiece.value),
        qtde: Number(qtde),
        total: resultCalc,
        unit: pieces?.value,
      })
    } else {
      setTotalValue(formatPrice(pieces?.value))
      setMsgError('Obrigatório!')
      sum(pieces?.value)
    }
  }

  const handleRemoveItemPieces = () => {
    setItemPieces((previousState) => [
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

  const pieces = useSelector(
    (state: IStore) =>
      state.piece.pieces.filter(
        (service) => service._id === valuePiece?.value,
      )[0],
  )

  const addValueArrayPieces = (itemPiece: ItemPieces) => {
    setItemPieces((previousState) => [
      ...previousState.filter(
        (item: ItemPieces) => item.id !== valuePiece.value,
      ),
      itemPiece,
    ])
  }

  const clearValues = () => {
    setQtdeValue('')
    setValueUnit('')
    setTotalValue('')
  }

  useEffect(() => {
    if (pieces?.value) {
      setItemPieces((previousState) => {
        const result = previousState.filter(
          (item: ItemPieces) => item.description === valuePiece.label,
        )
        handleRemoveItemPieces()
        if (!result.length) {
          setValueUnit(formatPrice(pieces?.value))
          setQtdeValue('1')
          calcPrice('1')
          addValueArrayPieces({
            description: valuePiece.label,
            id: String(valuePiece.value),
            qtde: 1,
            total: Number(pieces?.value),
            unit: pieces?.value,
          })
          setMsgErrorAutoComplete('')
        } else {
          setMsgErrorAutoComplete(
            'Essa peças já foi adicionada, escolha outra.',
          )
          clearValues()
        }
        return previousState
      })
    } else {
      setMsgErrorAutoComplete('')
      clearValues()
      handleRemoveItemPieces()
    }
  }, [valuePiece])

  useEffect(() => {
    let cancel: any

    const loadPiece = async () => {
      try {
        const { data } = await apiAdmin.get(`pieces`, {
          params: {
            description:
              (valuePiece.value === 0 && valuePiece.label) || undefined,
          },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })

        const dataMapped = data?.map((val: ServiceT) => ({
          value: val._id,
          label: val.description,
        }))

        setOptionPiece(dataMapped)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message)
        }
      }
    }
    loadPiece()

    return () => cancel && cancel()
  }, [valuePiece, makeRequest])

  /**
   * @description
   * The "onFormatterPrice" function aims to format the price input value.
   * It receives the value in string format as a parameter and uses the "formatInputPrice" function to obtain the formatted value.
   * Then, the "setValueUnit" function is called with the formatted value to update the application state.
   * This function is useful for ensuring that the price is displayed consistently and readably for the user.
   */
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
    <Row columns="5fr 0.1fr 1fr 1fr" gap={10} marginTop="5px">
      <Autocomplete
        value={valuePiece}
        setValue={setValuePiece}
        options={optionPiece}
        setOptions={setOptionPiece}
        hasError={!!msgErrorAutoComplete}
        error={msgErrorAutoComplete}
        onSelect={onHandleSelectedAutocomplete}
      />
      <InputText
        value={qtdeValue}
        mask={''}
        disabled={
          pieces?.value === undefined || !!msgErrorAutoComplete ? true : false
        }
        setValue={setQtdeValue}
        onChange={(event) => setQtdeValue && setQtdeValue(event.target.value)}
        onKeyUp={() => handleChange(qtdeValue)}
        hasError={!!msgError}
        msgError={msgError}
        width="60px"
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
