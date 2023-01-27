import { ServiceOrderT } from 'src/store/Types'

export const toApi = (data: ServiceOrderT): ServiceOrderT => {
  return {
    osNumber: data.osNumber,
    clientName: data.clientName,
    dateOS: data.dateOS,
    equipament: data.equipament,
    brand: data.brand,
    model: data.model,
    serialNumber: data.serialNumber,
    status: data.status,
  }
}
