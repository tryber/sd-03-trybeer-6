import { PRODUCT_HANDLER } from '../actions';

const INITIAL_STATE = {
  cart: {},
  total: 0,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_HANDLER:
      return {
        ...state,
        cart: { ...action.data },
        total: action.total,
      };
    default:
      return state;
  }
};

export default productReducer;
