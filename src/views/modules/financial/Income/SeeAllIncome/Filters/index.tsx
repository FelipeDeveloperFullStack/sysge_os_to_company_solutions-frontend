/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from '@mui/material'
import React, { useState } from 'react'
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
import { format, getMonth, getYear, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type SeeAllIncomeProps = {
  nameOrOsNumber: string
}

type FiltersProps = {
  setIncomesFiltered: React.Dispatch<React.SetStateAction<Income[]>>
}

const Filters: React.FC<FiltersProps> = ({ setIncomesFiltered }) => {
  const { control, handleSubmit } = useForm<SeeAllIncomeProps>()
  const { apiAdmin } = useAdmin()
  const [months, setMonths] = useState([])
  const [monthSelected, setMonthSelected] = useLocalStorage('monthSelected', '')
  const [years, setYears] = useState([])
  const [yearSelected, setYearSelected] = useLocalStorage('yearSelected', '')
  const [incomes, setIncomes] = useState<Income[]>([] as Income[])
  const { Loading } = useLoading()

  const onSubmitIncome = (nameOrOsNumber: SeeAllIncomeProps) => {
    console.log({ nameOrOsNumber })
  }

  const getDataOrderServices = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('orderServices')
      const { resultFromApi, orderedMonth, orderedYear } = fromApi(data)
      setMonths(orderedMonth)
      setYears(orderedYear)
      setIncomes(resultFromApi)
    } catch (error) {
      toast.error('Um erro ocurreu ao tentar buscar os dados de receitas')
    } finally {
      Loading.turnOff()
    }
  }

  const onHandleClickYear = (year: string) => {
    setYearSelected(year)
    const result = dataFilter(`${monthSelected}/${year}`, incomes)
    setIncomesFiltered(result)
  }

  const onHandleClickMonth = (month: string) => {
    if (!yearSelected) {
      toast.error('Selecione o ano.')
      return
    }
    setMonthSelected(month)
    const result = dataFilter(`${month}/${yearSelected}`, incomes)
    setIncomesFiltered(result)
  }

  function getDateCurrent(): void {
    const currentMonth = format(new Date(), 'MMM', {
      locale: ptBR,
    }).toUpperCase()
    const currentYear = String(getYear(new Date()))

    setMonthSelected(currentMonth)
    setYearSelected(currentYear)
  }

  const onHandleSituation = (situation: string) => {
    const result = incomes.filter((item) => item.situation === situation)
    setIncomesFiltered(result)
  }

  function dataFilter(data: string, arrayDatas: any[]): any[] {
    const [monthFind, yearFind] = data.split('/')
    const dataPesquisa = parse(
      `${monthFind}/${yearFind}`,
      'MMM/yyyy',
      new Date(),
      { locale: ptBR },
    )
    return arrayDatas.filter((dado) => {
      const dataDado = parse(dado.dateOS, 'dd/MM/yyyy', new Date())
      return (
        dataDado.getMonth() === dataPesquisa.getMonth() &&
        dataDado.getFullYear() === dataPesquisa.getFullYear()
      )
    })
  }

  React.useEffect(() => {
    getDataOrderServices()
    getDateCurrent()
  }, [])

  return (
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
              variant="outlined"
              textButton="Pendentes a Receber"
              color="error"
              onClick={() => onHandleSituation('PENDENTE')}
            />
            <Button
              variant="outlined"
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
                  <InputText label="" field={field} fieldState={fieldState} />
                )}
              />
            </Row>
          </Form>
        </Row>
      </Container>
    </Paper>
  )
}

export default Filters
