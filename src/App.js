// 2:06:00
import React, { useState } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
  const [changeState, setChangeState] = useState({
    // at first the initial value of cartItems is empty array, then we change it to localStorage.
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  });
  const createOrderHanlder = (order) => {
    alert('Need to save order for ' + order.name);
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
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const removeFromCartHandler = (product) => {
    const cartItems = changeState.cartItems.slice();
    setChangeState((preView) => {
      return {
        ...preView,
        cartItems: cartItems.filter((state) => state._id !== product._id),
      };
    });
    // this localStorage will act as a temporary storage to store the value when the page is refreshed.
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems.filter((state) => state._id !== product._id))
    );
  };
  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products onAddToCart={addToCartHandler} />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={changeState.cartItems}
                onRemoveFromCart={removeFromCartHandler}
                onCreateOrder={createOrderHanlder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    </Provider>
  );
};

export default App;
