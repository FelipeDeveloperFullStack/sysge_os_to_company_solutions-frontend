import * as yup from 'yup'

export const schemaServiceOrder = yup
  .object({
    //description: yup.string().required('Nome do Modelo obrigatório'),
  })
  .required()
