import { ADD_TO_CART, REMOVE_FROM_CART } from '../types';

export const cartReducer = (
  state = {
    cartProducts: JSON.parse(localStorage.getItem('cartItems')) || '[]',
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cartProducts: action.payload.cartItems,
      };
    case REMOVE_FROM_CART:
      return {
        cartProducts: action.payload.cartItems,
      };
    default:
      return state;
  }
};
