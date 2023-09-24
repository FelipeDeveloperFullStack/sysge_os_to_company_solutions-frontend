import { ClientT } from 'src/store/Types'
import { Laudo } from '../tables/type'

export type ItemPieces = {
  id: string
  description: string
  qtde: number
  unit: string
  total: number
}
export type ItemServices = {
  id: string
  description: string
  qtde: number
  unit: string
  total: number
}

export type OSData = {
  status: string
  description?: string
  dateOS: string
  typeDocument: string
  equipament: string
  brand: string
  model: string
  serialNumber: string
  cable: string
  charger: string
  breaked: string
  detail: string
  client: ClientT
  itemServices: ItemServices[]
  laudos: Laudo[]
  itemPieces: ItemPieces[]
  total: string
  subTotal: string
  valuePartial: string
  remainingValue: string
  discount: string
  manpower: string
  osNumber: string
  formOfPayment?: string
  isBoletoUploaded?: boolean
  dateGeneratedOS?: string
  idFileCreatedGoogleDrive?: string
  maturityOfTheBoleto?: string
  isSendThreeDayMaturityBoleto?: boolean
  isSendNowDayMaturityBoleto?: boolean
  isPartial?: boolean
  user?: string
  _id?: string
}
