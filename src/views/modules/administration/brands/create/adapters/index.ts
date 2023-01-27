import { ServiceApiT, ServiceT } from 'src/store/Types'

export const toApi = (data: ServiceT): ServiceApiT => {
  return {
    description: data.description,
  }
}
