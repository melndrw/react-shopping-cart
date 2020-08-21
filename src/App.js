import React, { useState } from 'react';
import data from './data';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

const App = () => {
  const [changeState, setChangeState] = useState({
    size: '',
    filter: '',
    products: data,
    cartItems: [],
  });

  const sizeHandler = (event) => {
    const { value } = event.target;
    value === ''
      ? setChangeState({ size: value, products: data })
      : setChangeState({
          size: event.target.value,
          products: data.filter((product) => {
            return product.availableSizes.indexOf(event.target.value) >= 0;
          }),
        });
  };

  const filterHandler = (event) => {
    const { value } = event.target;
    setChangeState((state) => {
      return {
        ...state,
        filter: value,
        products: changeState.products.slice().sort((a, b) => {
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

  const cartHandler = (product) => {
    const cartItem = changeState.cartItems.slice();
    let alreadyInCart = false;
    cartItem.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItem.push({ ...product, count: 1 });
    }
    setChangeState({ cartItem });
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
              count={changeState.products.length}
              filter={changeState.filter}
              size={changeState.size}
              filterProducts={filterHandler}
              sizeProducts={sizeHandler}
            />
            <Products products={changeState.products} addToCart={cartHandler} />
          </div>
          <div className="sidebar">
            <Cart cartItems={changeState.cartItems} />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
};

export default App;
