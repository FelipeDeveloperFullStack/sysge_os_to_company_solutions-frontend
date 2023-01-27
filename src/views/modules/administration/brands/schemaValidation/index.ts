import * as yup from 'yup'

export const schemaBrand = yup
  .object({
    description: yup.string().required('Nome da marca obrigatório'),
  })
  .required()
