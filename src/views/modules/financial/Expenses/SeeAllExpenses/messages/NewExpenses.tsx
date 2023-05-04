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

// type UpdateConfirmationProps = {
//   setMakeRequest: React.Dispatch<React.SetStateAction<number>>
// }

export const NewExpenses: React.FC = () => {
  const { closeModal } = useModal()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()
  const [valueClear, setValueClear] = useState(0)
  const { control, handleSubmit, setValue } = useForm<SeeAllExpenseProps>({
    resolver: yupResolver(schemaExpense),
    shouldUnregister: false,
  })

  const save = async (data: SeeAllExpenseProps) => {
    try {
      Loading.turnOn()
      await apiAdmin.post(`expense`, toApi(data))
      // setMakeRequest(Math.random())
      toast.success('Despesa financeira adicionada com sucesso.')
    } catch (error) {
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
            columns="repeat(3, 1fr)"
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
              name="status"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputText
                  label={'Status'}
                  field={field}
                  fieldState={fieldState}
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
