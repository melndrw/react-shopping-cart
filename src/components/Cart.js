import React from 'react';

const Cart = (props) => {
  const { cartItems } = props;
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart__header">Cart is Empty</div>
      ) : (
        <div className="cart cart__header">
          You have {cartItems.length} in this cart
        </div>
      )}
    </div>
  );
};

export default Cart;
