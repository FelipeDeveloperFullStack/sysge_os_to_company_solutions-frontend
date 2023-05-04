import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { formatInputPrice } from 'src/helpers/formatPrice'

export type Expense = {
  expense: string
  value?: number
  dateIn: string
  status: string
  valueFormated: string
  month: string
  year: string
  id: string
}

type ResponseFromApi = {
  resultFromApi: Expense[]
  orderedMonth: string[]
  orderedYear: string[]
}

type MonthAndYear = {
  month: string
  year: string
}

export const fromApi = (expense: Expense[]): ResponseFromApi => {
  const monthSet = new Set<string>()
  const orderMonth = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ]

  const removeFormatValueOs = (total: string): number => {
    const { clean } = formatInputPrice(total)
    return clean
  }

  const getMonthAndYear = (dateString: string): MonthAndYear => {
    const dateParse = parse(dateString, 'dd/MM/yyyy', new Date())
    const month = format(dateParse, 'MMM', { locale: ptBR }).toUpperCase()
    const year = format(dateParse, 'yyyy')
    monthSet.add(month)
    return { month, year }
  }

  const resultFromApi = expense.map((item) => ({
    expense: item.expense,
    value: item.value,
    dateIn: item.dateIn,
    status: item.status,
    valueFormated: item.valueFormated,
    situation: item.status,
    month: item.month,
    year: item.year,
    id: item.id,
  }))

  const orderedYear = (resultFromApi: Expense[]): string[] => {
    const yearSet = new Set<string>(resultFromApi.map((item) => item.year))
    return Array.from(yearSet).sort()
  }

  const orderedMonth = Array.from(monthSet).sort((a, b) => {
    return orderMonth.indexOf(a) - orderMonth.indexOf(b)
  })

  return {
    resultFromApi,
    orderedMonth,
    orderedYear: orderedYear(resultFromApi),
  }
}
