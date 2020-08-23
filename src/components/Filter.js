import React from 'react';
import { connect } from 'react-redux';

import { filterProducts, sortProducts } from '../actions/productActions';

// for all we know in props.reactName, we are using that to anchor a value from where the Components to be used into this file, but with react-redux, we have a method called connect which connect the props into the database. it is inserted at the exporting part of the Component.

const Filter = (props) => {
  return !props.filtered ? (
    <div>Loading...</div>
  ) : (
    <div className="filter">
      <div className="filter__result">{props.filtered.length} Products</div>
      <div className="filter-sort">
        Order{' '}
        <select
          // value={props.filter}
          onChange={(e) => props.sortProducts(props.filtered, e.target.value)}
        >
          <option value="">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter__size">
        Filter{' '}
        <select
          // value={props.size}
          onChange={(e) => props.filterProducts(props.products, e.target.value)}
        >
          <option value="">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

// with connect, the props can be connected to the database.
// the "products" beside the state is the variable which is called at the store.
export default connect(
  (state) => ({
    // size: state.products.size,
    sorts: state.products.sorted,
    products: state.products.items,
    filtered: state.products.filteredItems,
    //propsName:state.storeName.initialStateName
  }),
  { filterProducts, sortProducts }
)(Filter);
