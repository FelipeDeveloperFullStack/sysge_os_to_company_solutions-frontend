export type ClientFromApi = {
  _id: string
  name: string
  cpfOrCnpj: string
  email: string
  phoneNumber: string
  phoneNumberFixo: string
  address: string
  city: string
  uf: string
  cep: string
  status?: string
}
export type Client = {
  _id: string
  name: string
  cpfOrCnpj: string
  email: string
  phoneNumber: string
  phoneNumberFixo: string
  address: string
  city: string
  uf: string
  cep: string
  __v: number
}
