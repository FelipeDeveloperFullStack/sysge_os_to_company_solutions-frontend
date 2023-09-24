import { Income } from '../Table/adapter'

export type SeeAllIncomeProps = {
  income: string
  client: string
  valueFormated: string
  paymentForm: string
  valueFormatedPiece: string
  dateIn: string
  maturity: string
  status: string
}

export type FiltersProps = {
  setExpensesFiltered: React.Dispatch<React.SetStateAction<Income[]>>
  makeRequest: number
}

export interface OptionsProps {
  label: string
  value: string
}
