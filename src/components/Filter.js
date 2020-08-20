import React from 'react';

const Filter = (props) => {
  return (
    <div className="filter">
      <div className="filter__result">{props.count} Products</div>
      <div className="filter-sort">
        Order{' '}
        <select value={props.filter} onChange={props.filterProducts}>
          <option>Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter__size">
        Filter{' '}
        <select value={props.size} onChange={props.sizeProducts}>
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

export default Filter;
