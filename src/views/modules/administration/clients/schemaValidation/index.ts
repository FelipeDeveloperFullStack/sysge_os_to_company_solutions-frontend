import * as yup from 'yup'

export const schemaClient = yup
  .object({
    name: yup.string().required('Nome obrigatório'),
    // cpfOrCnpj: yup.string().required('CPF/CNPJ obrigatório'),
    phoneNumber: yup.string(),
    email: yup.string().email('Email inválido'),
    // address: yup.string(),
    // city: yup.string(),
    uf: yup.string().max(2, 'Máximo 2 caracteres.'),
  })
  .required()
