import { SeeAllIncomeProps } from '../../types'

export const toApi = (data: SeeAllIncomeProps) => {
  return {
    status: data?.status,
    description: data?.income,
    total: data?.valueFormated,
    dateOS: data?.dateIn,
    formOfPayment: data?.paymentForm,
    maturityOfTheBoleto: data?.maturity,
  }
}
