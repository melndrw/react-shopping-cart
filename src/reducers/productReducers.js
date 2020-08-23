import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from '../types';

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    // reducer for filtering based on sizes
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        filteredItems: action.payload.items,
        size: action.payload.size,
      };
    // reducer for filtering based on prices
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sorts: action.payload.sorted,
        filteredItems: action.payload.items,
      };
    // reducer for fetching the products data from the database
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};
