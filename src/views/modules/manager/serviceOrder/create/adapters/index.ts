import { OSData } from '../type'

export const toApi = (data: OSData, osNumber: string): OSData => {
  return {
    status: data.status || null,
    osNumber: osNumber,
    dateOS: data.dateOS || null,
    equipament: data.equipament || null,
    brand: data.brand || null,
    model: data.model || null,
    serialNumber: data.serialNumber || null,
    cable: data.cable || null,
    charger: data.charger || null,
    breaked: data.breaked || null,
    detail: data.detail || null,
    client: {
      name: data.client.name || null,
      address: data.client.address || null,
      city: data.client.city || null,
      uf: data.client.uf || null,
      cpfOrCnpj: data.client.cpfOrCnpj || null,
      email: data.client.email || null,
      phoneNumber: data.client.phoneNumber || null,
      phoneNumberFixo: data.client.phoneNumberFixo || null,
      cep: data.client.cep || null,
    },
    itemServices: data.itemServices || null,
    laudos: data.laudos || null,
    itemPieces: data.itemPieces || null,
    total: data.total || null,
    manpower: data.manpower || null,
  }
}
