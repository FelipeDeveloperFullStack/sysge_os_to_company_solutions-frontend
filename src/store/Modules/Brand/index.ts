import { BRAND_FILTER, BRAND_SEE_ALL } from 'src/store/actions'
import { Action } from './type'

export const INIT_STATE = {
  brands: [
    {
      _id: '',
      description: '',
    },
  ],
  brandFilter: {
    description: undefined,
  },
}

export default function brandReducer(state = INIT_STATE, action: Action) {
  switch (action.type) {
    case BRAND_SEE_ALL: {
      return {
        ...state,
        brands: action.payload,
      }
    }
    case BRAND_FILTER: {
      return {
        ...state,
        brandFilter: action.payload,
      }
    }
    default: {
      return { ...state }
    }
  }
}
