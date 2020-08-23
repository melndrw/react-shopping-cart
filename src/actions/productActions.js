import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from '../types';
// import products from '../data';

// reducer handler for grabbing the data from the database
export const fetchProducts = () => async (dispatch) => {
  const res = await fetch('/api/products');
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

// reducer handler for filtering the products by size
export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ''
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

// reducer handler for filtering the products by price
export const sortProducts = (sortFilter, sort) => (dispatch) => {
  const sortedProducts = sortFilter.slice();
  if (sort === '') {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === 'lowest'
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sorts: sort,
      items: sortedProducts,
    },
  });
};
