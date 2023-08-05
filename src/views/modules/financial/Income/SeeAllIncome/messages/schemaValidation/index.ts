import * as yup from 'yup'

export const schemaAddPartialIncome = yup
  .object({
    expense: yup.string().required('Nome da despesa obrigatório'),
    valueFormated: yup.string().required('Valor obrigatório'),
    dateIn: yup.string().required('Data de entrada obrigatório'),
    //maturity: yup.string().required('Data de vencimento obrigatório'),
    status: yup.string().required('Status obrigatório'),
  })
  .required()
