import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { formatInputPrice } from 'src/helpers/formatPrice'
import { OSData } from 'src/views/modules/manager/serviceOrder/create/type'

export type Income = {
  clientName: string
  cpfOrCnpj: string
  osNumber: string
  valueNumber: number
  valueFormated: string
  formOfPayment: string
  situation: string
  dateOS: string
  month: string
  year: string
  idFileCreatedGoogleDrive?: string
  id: string
}

type ResponseFromApi = {
  resultFromApi: Income[]
  orderedMonth: string[]
  orderedYear: string[]
}

type MonthAndYear = {
  month: string
  year: string
}

export const fromApi = (oSData: OSData[]): ResponseFromApi => {
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

  const resultFromApi = oSData.map((item) => ({
    clientName: item.client.name,
    cpfOrCnpj: item.client.cpfOrCnpj,
    osNumber: item.osNumber,
    valueNumber: removeFormatValueOs(item.total),
    valueFormated: item.total,
    situation: item.status,
    dateOS: item.dateOS,
    month: getMonthAndYear(item.dateOS).month,
    year: getMonthAndYear(item.dateOS).year,
    formOfPayment: item.formOfPayment,
    typeDocument: item.typeDocument,
    idFileCreatedGoogleDrive: item.idFileCreatedGoogleDrive,
    id: item._id,
  }))

  const orderedYear = (resultFromApi: Income[]): string[] => {
    const yearSet = new Set<string>(resultFromApi.map((item) => item.year))
    return Array.from(yearSet).sort()
  }

  const orderedMonth = Array.from(monthSet).sort((a, b) => {
    return orderMonth.indexOf(a) - orderMonth.indexOf(b)
  })

  return {
    resultFromApi: resultFromApi.filter(
      (item) => item.typeDocument !== 'ORCAMENTO',
    ),
    orderedMonth,
    orderedYear: orderedYear(resultFromApi),
  }
}
