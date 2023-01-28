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
  clientName: string
  status: string
  osNumber: string
  dateOS: string
  equipament: string
  brand: string
  model: string
  serialNumber: string
  itemServices: [
    {
      description: string
      id: string
      qtde: number
      total: number
      unit: number
    },
    {
      description: string
      id: string
      qtde: number
      total: number
      unit: number
    },
  ]
  laudos: [
    {
      checked: boolean
      description: string
      service: string
    },
  ]
  itemPieces: [
    {
      description: string
      id: string
      qtde: number
      total: number
      unit: number
    },
    {
      description: string
      id: string
      qtde: number
      total: number
      unit: number
    },
  ]
  total: string
  manpower: string
}
