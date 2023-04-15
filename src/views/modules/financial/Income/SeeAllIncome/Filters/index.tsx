/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from 'src/components'
import InputText from 'src/components/Form/InputText/index_old'
import { toast } from 'src/components/Widgets/Toastify'
import { useLoading } from 'src/hooks/useLoading'
import { useAdmin } from 'src/services/useAdmin'
import { Row } from 'src/styles'
import useLocalStorage from 'use-local-storage'
import { fromApi, Income } from '../Table/adapter'
import { Container, Form } from './style'
import { format, getYear, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type SeeAllIncomeProps = {
  nameOrOsNumber: string
}

type FiltersProps = {
  setIncomesFiltered: React.Dispatch<React.SetStateAction<Income[]>>
  makeRequest: number
}

const Filters: React.FC<FiltersProps> = ({
  setIncomesFiltered,
  makeRequest,
}) => {
  const { control, handleSubmit, getValues, watch } =
    useForm<SeeAllIncomeProps>()
  const { apiAdmin } = useAdmin()
  const [months, setMonths] = useState([])
  const [monthSelected, setMonthSelected] = useLocalStorage('monthSelected', '')
  const [years, setYears] = useState([])
  const [yearSelected, setYearSelected] = useLocalStorage('yearSelected', '')
  const [incomes, setIncomes] = useState<Income[]>([] as Income[])
  const { Loading } = useLoading()
  const [selectedButton, setSelectedButton] = useLocalStorage(
    'selectedButton',
    '',
  )
  const inputValueName = watch('nameOrOsNumber')

  const onSubmitIncome = (nameOrOsNumber: SeeAllIncomeProps) => {
    // const result = dateFilter(`${monthSelected}/${yearSelected}`, incomes)
    // setIncomesFiltered(result)
  }

  const checkIfbuttonHasSelected = (dataIncomeResponseFromApi: Income[]) => {
    const { monthSelected, yearSelected } = getDateCurrent()
    if (monthSelected && yearSelected) {
      const result = dateFilter(
        `${monthSelected}/${yearSelected}`,
        dataIncomeResponseFromApi,
        'PENDENTE',
      )
      setIncomesFiltered(result)
    } else {
      setIncomesFiltered(dataIncomeResponseFromApi)
    }
  }

  const getDataOrderServices = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('orderServices')
      const { resultFromApi, orderedMonth, orderedYear } = fromApi(data)
      setMonths(orderedMonth)
      setYears(orderedYear)
      setIncomes(resultFromApi)
      checkIfbuttonHasSelected(resultFromApi)
    } catch (error) {
      toast.error('Um erro ocurreu ao tentar buscar os dados de receitas')
    } finally {
      Loading.turnOff()
    }
  }

  const onHandleClickYear = (year: string) => {
    setYearSelected(year)
    const result = dateFilter(`${monthSelected}/${year}`, incomes)
    setIncomesFiltered(result)
  }

  const onHandleClickMonth = (month: string) => {
    if (!yearSelected) {
      toast.error('Selecione o ano.')
      return
    }
    setMonthSelected(month)
    const result = dateFilter(`${month}/${yearSelected}`, incomes)
    setIncomesFiltered(result)
  }

  function getDateCurrent() {
    const currentMonth = format(new Date(), 'MMM', {
      locale: ptBR,
    }).toUpperCase()
    const currentYear = String(getYear(new Date()))
    setMonthSelected(currentMonth)
    setYearSelected(currentYear)
    setSelectedButton('PENDENTE')
    return {
      monthSelected: currentMonth,
      yearSelected: currentYear,
    }
  }

  const onHandleSituation = (situation: string) => {
    setSelectedButton(situation)
    const result = dateFilter(
      `${monthSelected}/${yearSelected}`,
      incomes,
      situation,
    )
    setIncomesFiltered(result)
  }

  function dateFilter(
    data: string,
    arrayDatas: Income[],
    situation?: string,
    income?: string,
  ): any[] {
    try {
      Loading.turnOn()
      const valuesFields = getValues()
      const [monthFind, yearFind] = data.split('/')
      const dataPesquisa = parse(
        `${monthFind}/${yearFind}`,
        'MMM/yyyy',
        new Date(),
        { locale: ptBR },
      )
      return arrayDatas
        .filter((dado) => {
          const dataDado = parse(dado.dateOS, 'dd/MM/yyyy', new Date())
          return (
            dataDado.getMonth() === dataPesquisa.getMonth() &&
            dataDado.getFullYear() === dataPesquisa.getFullYear()
          )
        })
        .filter((item) => (situation ? item.situation === situation : item))
        .filter((item) =>
          valuesFields.nameOrOsNumber !== ''
            ? item.clientName
                .toUpperCase()
                .includes(valuesFields?.nameOrOsNumber?.toUpperCase())
            : item,
        )
        .filter((item) =>
          income
            ? item.clientName.toUpperCase().includes(income?.toUpperCase())
            : item,
        )
    } catch (err) {
      toast.error('Ocorreu um erro ao realizar a filtragem dos dados.')
    } finally {
      Loading.turnOff()
    }
  }

  useEffect(() => {
    getDataOrderServices()
  }, [makeRequest])

  useEffect(() => {
    const result = dateFilter(
      `${monthSelected}/${yearSelected}`,
      incomes,
      '',
      inputValueName,
    )
    setIncomesFiltered(result)
  }, [inputValueName])

  return (
    <>
      {!!incomes.length && (
        <Paper elevation={1}>
          <Container>
            <Row display="flex" flexDirection="column" gap={1}>
              <div>Ano:</div>
              <Row
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                gap={10}
              >
                {years.map((year, index) => (
                  <Button
                    variant={yearSelected === year ? 'contained' : 'outlined'}
                    textButton={year}
                    onClick={() => onHandleClickYear(year)}
                  />
                ))}
              </Row>
            </Row>
            <Row display="flex" flexDirection="column" gap={1}>
              <div>Mês:</div>
              <Row
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                gap={10}
              >
                {months.map((month) => (
                  <Button
                    variant={monthSelected === month ? 'contained' : 'outlined'}
                    textButton={month}
                    onClick={() => onHandleClickMonth(month)}
                  />
                ))}
              </Row>
            </Row>
            <Row display="flex" flexDirection="column" gap={1}>
              <div>Situação:</div>
              <Row
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                gap={10}
              >
                <Button
                  variant={
                    selectedButton === 'PENDENTE' ? 'contained' : 'outlined'
                  }
                  textButton="Pendentes a Receber"
                  color="warning"
                  onClick={() => onHandleSituation('PENDENTE')}
                />
                <Button
                  variant={selectedButton === 'PAGO' ? 'contained' : 'outlined'}
                  textButton="Recebidos"
                  color="success"
                  onClick={() => onHandleSituation('PAGO')}
                />
              </Row>
            </Row>
            <Row display="flex" flexDirection="column" gap={1}>
              <div>Cliente/Nº O.S:</div>
              <Form onSubmit={handleSubmit(onSubmitIncome)} autoComplete="off">
                <Row display="grid" columns="1fr" alignItems="end" gap={10}>
                  <Controller
                    name="nameOrOsNumber"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <InputText
                        label=""
                        field={field}
                        fieldState={fieldState}
                      />
                    )}
                  />
                </Row>
              </Form>
            </Row>
          </Container>
        </Paper>
      )}
    </>
  )
}

export default Filters
