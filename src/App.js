import React, { useState } from 'react';
import data from './data';
import Products from './components/Products';
import Filter from './components/Filter';

const App = () => {
  const [sortState, setSortState] = useState({
    size: '',
    filter: '',
    products: data,
  });

  const sizeHandler = (event) => {
    const { value } = event.target;
    value === ''
      ? setSortState({ size: value, products: data })
      : setSortState({
          size: event.target.value,
          products: data.filter((product) => {
            return product.availableSizes.indexOf(event.target.value) >= 0;
          }),
        });
  };

  const filterHandler = (event) => {
    const { value } = event.target;
    setSortState((state) => {
      return {
        ...state,
        filter: value,
        products: sortState.products.slice().sort((a, b) => {
          return value === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : value === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1;
        }),
      };
    });
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={sortState.products.length}
              filter={sortState.filter}
              size={sortState.size}
              filterProducts={filterHandler}
              sizeProducts={sizeHandler}
            />
            <Products products={sortState.products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
};

export default App;
