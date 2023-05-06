import { Expense } from '../Table/adapter'

export type SeeAllExpenseProps = {
  expense: string
  valueFormated: string
  dateIn: string
  maturity: string
  status: string
}

export type FiltersProps = {
  setExpensesFiltered: React.Dispatch<React.SetStateAction<Expense[]>>
  makeRequest: number
}
