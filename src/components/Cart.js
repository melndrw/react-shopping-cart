import React from 'react';
import formatCurrency from './util';

const Cart = (props) => {
  const { cartItems } = props;
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
        </div>
        {cartItems.length !== 0 && (
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
              <button className="button primary">Proceed</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
