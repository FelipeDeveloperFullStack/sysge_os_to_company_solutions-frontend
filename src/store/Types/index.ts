export interface IStore {
  account: IAccount
  form: any
  whatsappConnection: IWhatsappConnection
  client: {
    clients: Array<ClientT>
    clientFilter: ClientT
  }
  piece: {
    pieces: Array<PieceT>
    pieceFilter: PieceT
  }
  service: {
    services: Array<ServiceT>
    serviceFilter: ServiceT
  }
  serviceOrder: {
    serviceOrders: Array<ServiceOrderT>
    serviceOrderFilter: ServiceOrderT
  }
  createServiceOrder: {
    createServiceOrder: CreateServiceOrderT
  }
  equipament: {
    equipaments: Array<EquipamentT>
    equipamentFilter: EquipamentT
  }
  layout: {
    title: string
    makeRequest: number
  }
}

export interface IWhatsappConnection {
  sessionState?: string
  session?: string
  userNumber?: string
  defaultNumber?: boolean
  lastUpdate?: string
  nameUserSession?: string
}

export type LayoutT = {
  title?: string
  makeRequest?: number
}

export type ClientT = {
  name?: string
  cpfOrCnpj?: string
  email?: string
  phoneNumber?: string
  phoneNumberFixo?: string
  address?: string
  city?: string
  uf?: string
  cep?: string
  _id?: string
}
export type PieceT = {
  description?: string
  value?: string
  _id?: string
}

export type ServiceT = {
  description?: string
  laudoService?: string
  laudos?: string[]
  value?: string
  _id?: string
}

export type ModelT = {
  description?: string
  _id?: string
}

export type ServiceOrderT = {
  clientName: string
  osNumber: string
  dateOS: string
  status: string
  equipament?: string
  brand?: string
  model?: string
  serialNumber?: string
  cable?: string
  charger?: string
  breaked?: string
  detail?: string
  _id?: string
  laudos: [
    {
      checked: false
      description: string
    },
  ]
}
export type CreateServiceOrderT = {
  laudos: [
    {
      checked: false
      description: string
      service: string
    },
  ]
  total: number
}

export type EquipamentT = {
  equipamentName?: string
  brand?: string
  model?: string
  serialNumber?: string
  _id?: string
}

export type PieceToApiT = {
  description: string
  value: number
}

export type ServiceApiT = {
  description: string
  laudos: string[]
  value: number
}

export interface IAccount {
  token: string
  isLoggedIn: boolean
  isInitialized: boolean
  user: {
    username: string
    cpf: number | string
    name: string
    sub: string
    iat: number
    exp: number
  }
}
