import * as yup from 'yup'

export const schemaExpense = yup
  .object({
    expense: yup.string().required('Nome da despesa obrigatório'),
    valueFormated: yup.string().required('Valor obrigatório'),
    dateIn: yup.string().required('Data de entrada obrigatório'),
    status: yup.string().required('Status obrigatório'),
  })
  .required()
