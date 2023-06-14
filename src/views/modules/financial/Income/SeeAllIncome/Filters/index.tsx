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
import hasNumber from 'src/helpers/hasNumber'

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
    'PENDENTE',
  )
  const nameOrOsNumber = watch('nameOrOsNumber')

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
        !selectedButton ? 'PENDENTE' : selectedButton,
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
    const result = dateFilter(
      `${monthSelected}/${year}`,
      incomes,
      selectedButton,
    )
    setIncomesFiltered(result)
  }

  const onHandleClickMonth = (month: string) => {
    if (!yearSelected) {
      toast.error('Selecione o ano.')
      return
    }
    setMonthSelected(month)
    const result = dateFilter(
      `${month}/${yearSelected}`,
      incomes,
      selectedButton,
    )
    setIncomesFiltered(result)
  }

  function getDateCurrent() {
    const currentMonth = format(new Date(), 'MMM', {
      locale: ptBR,
    }).toUpperCase()
    const currentYear = String(getYear(new Date()))
    setMonthSelected(currentMonth)
    setYearSelected(currentYear)
    setSelectedButton(!selectedButton ? 'PENDENTE' : selectedButton)
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
      return arrayDatas.filter((data) => {
        const dataDado = parse(data.dateOS, 'dd/MM/yyyy', new Date())
        if (!income) {
          return (
            dataDado.getMonth() === dataPesquisa.getMonth() &&
            dataDado.getFullYear() === dataPesquisa.getFullYear() &&
            data.situation === situation
          )
        } else {
          if (hasNumber(valuesFields?.nameOrOsNumber)) {
            return (
              data.osNumber.trim() === income?.trim() &&
              data.situation === situation
            )
          } else {
            return (
              dataDado.getMonth() === dataPesquisa.getMonth() &&
              dataDado.getFullYear() === dataPesquisa.getFullYear() &&
              data.situation === situation &&
              data.clientName
                ?.toUpperCase()
                .trim()
                .includes(income?.toUpperCase()?.trim())
            )
          }
        }
      })
      // .filter((item) =>
      //   item.osNumber
      //     .toUpperCase()
      //     .trim()
      //     .includes(valuesFields?.nameOrOsNumber?.toUpperCase().trim()),
      // )
      // .filter((item) =>
      //   income
      //     ? item.clientName
      //         .toUpperCase()
      //         .trim()
      //         .includes(income?.toUpperCase().trim())
      //     : item,
      // )
      // .filter((item) => (situation ? item.situation === situation : item))
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
      selectedButton,
      nameOrOsNumber,
    )
    setIncomesFiltered(result)
  }, [nameOrOsNumber])

  useEffect(() => {
    return () => {
      window.localStorage.removeItem('selectedButton')
    }
  }, [])

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
                gap={2}
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
                gap={2}
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
                gap={2}
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
              <Form onSubmit={handleSubmit(onSubmitIncome)} autoComplete="off">
                <Row display="grid" columns="1fr" alignItems="end" gap={10}>
                  <Controller
                    name="nameOrOsNumber"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <InputText
                        label="Cliente/Nº O.S:"
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
