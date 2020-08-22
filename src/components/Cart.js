import React, { useState } from 'react';
import formatCurrency from './util';
import Fade from 'react-reveal/Fade';

const Cart = (props) => {
  const { cartItems } = props;

  const [checkoutState, setShowCheckout] = useState({
    showCheckout: false,
    name: '',
    email: '',
    address: '',
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setShowCheckout((preView) => {
      return {
        ...preView,
        [name]: value,
      };
    });
  };

  const onCreateOrder = (e) => {
    e.preventDefault();
    const order = {
      name: checkoutState.name,
      email: checkoutState.email,
      address: checkoutState.address,
      cartItems: props.cartItems,
    };
    props.onCreateOrder(order);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart__header">Cart is Empty</div>
      ) : (
        <div className="cart cart__header">
          You have {cartItems.length} in this cart{' '}
        </div>
      )}
      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart__items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{' '}
                      <button
                        className="button"
                        onClick={() => props.onRemoveFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{' '}
                  {formatCurrency(
                    cartItems.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.price * currentValue.count,
                      0
                    )
                  )}
                </div>
                <button
                  onClick={() => setShowCheckout({ showCheckout: true })}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {checkoutState.showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form onSubmit={onCreateOrder}>
                    <ul className="form__container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          require
                          onChange={inputHandler}
                        />
                        <label>Name</label>
                        <input
                          name="name"
                          type="name"
                          require
                          onChange={inputHandler}
                        />
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          require
                          onChange={inputHandler}
                        />
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
