import React, { useState } from 'react';
import data from './data';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

const App = () => {
  const [changeState, setChangeState] = useState({
    cartItems: [],
    products: data,
    size: '',
    filter: '',
  });

  const sizeHandler = (event) => {
    const { value } = event.target;
    value === ''
      ? setChangeState((preView) => {
          return {
            ...preView,
            size: value,
            products: data,
          };
        })
      : setChangeState((preView) => {
          return {
            ...preView,
            size: value,
            products: data.filter((product) => {
              return product.availableSizes.indexOf(value) >= 0;
            }),
          };
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

  const addToCartHandler = (product) => {
    const cartItems = changeState.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    setChangeState((preView) => {
      return {
        ...preView,
        cartItems: cartItems,
      };
    });
  };

  const removeFromCartHandler = (product) => {
    const cartItems = changeState.cartItems.slice();
    setChangeState((preView) => {
      return {
        ...preView,
        cartItems: cartItems.filter((state) => state._id !== product._id),
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
              count={changeState.products.length}
              filter={changeState.filter}
              size={changeState.size}
              filterProducts={filterHandler}
              sizeProducts={sizeHandler}
            />
            <Products
              products={changeState.products}
              onAddToCart={addToCartHandler}
            />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={changeState.cartItems}
              onRemoveFromCart={removeFromCartHandler}
            />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
};

export default App;
