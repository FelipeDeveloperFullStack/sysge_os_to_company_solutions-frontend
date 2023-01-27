import * as yup from 'yup'

export const schemaModel = yup
  .object({
    description: yup.string().required('Nome do Modelo obrigatório'),
  })
  .required()
