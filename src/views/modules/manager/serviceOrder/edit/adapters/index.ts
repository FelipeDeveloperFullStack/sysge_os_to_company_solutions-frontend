import { EquipamentT } from 'src/store/Types'
import { OSData } from '../type'

export const fromApiSerialNumber = (equipaments: EquipamentT[]) => {
  const resultSerialNumber = equipaments
    .map((item) => ({
      label: item.serialNumber,
      value: item.serialNumber,
    }))
    .filter((item) => item.label)
  resultSerialNumber.push({
    label: 'SEM NÚMERO DE SÉRIE',
    value: 'SEM NÚMERO DE SÉRIE',
  })
  resultSerialNumber.push({ label: 'SEM PATRIMONIO', value: 'SEM PATRIMONIO' })
  return resultSerialNumber
}

export const toApi = (data: OSData, osNumber: string): OSData => {
  return {
    status: data.status || undefined,
    typeDocument: data.typeDocument || undefined,
    osNumber: osNumber,
    dateOS: data.dateOS || undefined,
    equipament: data.equipament || undefined,
    brand: data.brand || undefined,
    model: data.model || undefined,
    serialNumber: data.serialNumber || undefined,
    cable: data.cable || undefined,
    charger: data.charger || undefined,
    breaked: data.breaked || undefined,
    detail: data.detail || undefined,
    _id: data._id,
    // client: {
    //   name: data?.client?.name || undefined,
    //   address: data.client?.address || undefined,
    //   city: data.client?.city || undefined,
    //   uf: data.client?.uf || undefined,
    //   cpfOrCnpj: data.client?.cpfOrCnpj || undefined,
    //   email: data.client?.email || undefined,
    //   phoneNumber: data.client?.phoneNumber || undefined,
    //   phoneNumberFixo: data.client?.phoneNumberFixo || undefined,
    //   cep: data.client?.cep || undefined,
    //   id: data._id,
    // },
    itemServices: data.itemServices || undefined,
    laudos: data.laudos || undefined,
    itemPieces: data.itemPieces || undefined,
    total: data.total || undefined,
    manpower: data.manpower || undefined,
    discount: data.discount || undefined,
    subTotal: data.subTotal || undefined,
  }
}
