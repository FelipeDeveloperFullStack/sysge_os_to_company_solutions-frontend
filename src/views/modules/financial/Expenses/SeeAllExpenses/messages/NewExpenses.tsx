/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Button } from 'src/components'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import InputText from 'src/components/Form/InputText/index_old'
import { Controller, useForm } from 'react-hook-form'
import InputMask from 'src/components/Form/InputMask'
import {
  UpdateDeleteConfirmationContainer,
  NewExpenseContainer,
  TitleModalNewExpense,
} from './style'
import { toast } from 'src/components/Widgets/Toastify'
import { Row } from 'src/styles'
import { SeeAllExpenseProps } from '../types'
import { formatInputPrice } from 'src/helpers/formatPrice'
import { toApi } from './adapter/toApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaExpense } from './schemaValidation'
import { Select } from 'src/components/Widgets/Select'
import {
  Autocomplete,
  AutocompleteOptions,
} from 'src/components/Form/Autocomplete'
import { addDaysMaturity, statusOptions } from './statics'
import onlyNumbers from 'src/helpers/clear/onlyNumbers'

type UpdateConfirmationProps = {
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

export const NewExpenses: React.FC<UpdateConfirmationProps> = ({
  setMakeRequest,
}) => {
  const { closeModal } = useModal()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()
  const [_, setValueClear] = useState(0)

  const { control, handleSubmit, setValue, watch } =
    useForm<SeeAllExpenseProps>({
      resolver: yupResolver(schemaExpense),
      shouldUnregister: false,
    })

  const [optionMaturity, setOptionMaturity] = useState<AutocompleteOptions[]>(
    [] as AutocompleteOptions[],
  )

  const [clickedMaturity, setClickedMaturity] = useState(
    {} as AutocompleteOptions,
  )

  const dateIn = watch('dateIn')
  const maturity = watch('maturity')
  setValue('status', statusOptions[0].label)

  const save = async (data: SeeAllExpenseProps) => {
    try {
      Loading.turnOn()
      data = {
        ...data,
        maturity: clickedMaturity?.label || maturity,
      }
      await apiAdmin.post(`expense`, toApi(data))
      setMakeRequest(Math.random())
      toast.success('Despesa financeira adicionada com sucesso.')
    } catch (error) {
      console.log(error)
      toast.error(
        'Opss! Ocorreu um erro ao tentar inserir o registro financeiro.',
      )
    } finally {
      Loading.turnOff()
      closeModal()
    }
  }

  const cancel = () => {
    closeModal()
  }

  const onSubmitIncome = async (data: SeeAllExpenseProps) => {
    await save(data)
  }

  const onFormatterPrice = (value: string) => {
    const { formated, clean } = formatInputPrice(value)
    setValue('valueFormated', formated)
    setValueClear(clean)
  }

  React.useEffect(() => {
    if (dateIn) {
      const onlyNumber = onlyNumbers(dateIn)
      if (onlyNumber.length === 8) {
        setOptionMaturity(addDaysMaturity(dateIn))
      }
    }
  }, [dateIn])

  React.useEffect(() => {
    if (maturity) {
      const onlyNumberMaturity = onlyNumbers(maturity)
      if (!onlyNumberMaturity.length) {
        if (dateIn) {
          const onlyNumberDateIn = onlyNumbers(dateIn)
          if (onlyNumberDateIn.length === 8) {
            setOptionMaturity(addDaysMaturity(dateIn))
          }
        } else {
          setOptionMaturity([])
        }
      }
    }
  }, [maturity])

  return (
    <NewExpenseContainer>
      <form onSubmit={handleSubmit(onSubmitIncome)} autoComplete="off">
        <Row display="flex" flexDirection="column" gap={1}>
          <TitleModalNewExpense>Nova Despesa</TitleModalNewExpense>
          <Row
            display="grid"
            columns="1fr"
            alignItems="end"
            gap={10}
            marginBottom="20px"
          >
            <Controller
              name="expense"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputText
                  label="Despesa:"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            />
          </Row>
          <Row
            display="grid"
            columns="repeat(4, 1fr)"
            alignItems="end"
            gap={10}
          >
            <Controller
              name="valueFormated"
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
            <Controller
              name="dateIn"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputMask
                  label="Entrada"
                  variant="outlined"
                  fieldState={fieldState}
                  hasError={!!fieldState.error}
                  msgError={fieldState.error?.message}
                  mask="99/99/9999"
                  {...field}
                />
              )}
            />
            <Controller
              name="maturity"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Autocomplete
                  label="Vencimento"
                  value={{ label: field.value, value: field.value }}
                  setValue={(previousState: AutocompleteOptions) =>
                    setValue('maturity', previousState.label)
                  }
                  mask="99/99/9999"
                  options={optionMaturity}
                  setOptions={setOptionMaturity}
                  setClickedValue={setClickedMaturity}
                  hasError={!!fieldState.error}
                  error={fieldState.error?.message}
                  isUseButton
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Select
                  label={'Status'}
                  value={field.value}
                  setValue={(previousState) =>
                    setValue('status', previousState)
                  }
                  options={statusOptions}
                  hasError={!!fieldState.error}
                  msgError={fieldState.error?.message}
                />
              )}
            />
          </Row>
        </Row>
        <UpdateDeleteConfirmationContainer>
          <Button
            textButton="Salvar"
            variant="outlined"
            size="large"
            icon="add2"
            // onClick={confirmation}
            type="submit"
          />
          <Button
            textButton="Cancelar"
            variant="outlined"
            size="large"
            icon="close"
            color="error"
            onClick={cancel}
          />
        </UpdateDeleteConfirmationContainer>
      </form>
    </NewExpenseContainer>
  )
}
