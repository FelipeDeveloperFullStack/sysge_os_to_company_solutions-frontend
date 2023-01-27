import { SERVICE_ORDER_FILTER, SERVICE_ORDER_SEE_ALL } from 'src/store/actions'
import { Action } from './type'

export const INIT_STATE = {
  serviceOrders: [
    {
      _id: '',
      clientName: '',
      osNumber: '',
      dateOS: '',
      status: '',
      equipament: '',
      brand: '',
      model: '',
      serialNumber: '',
    },
  ],
  serviceOrderFilter: {
    clientName: undefined,
    osNumber: undefined,
  },
}

export default function serviceOrderReducer(
  state = INIT_STATE,
  action: Action,
) {
  switch (action.type) {
    case SERVICE_ORDER_SEE_ALL: {
      return {
        ...state,
        serviceOrders: action.payload,
      }
    }
    case SERVICE_ORDER_FILTER: {
      return {
        ...state,
        serviceOrderFilter: action.payload,
      }
    }
    default: {
      return { ...state }
    }
  }
}
