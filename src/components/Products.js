import React, { useState, useEffect } from 'react';
import formatCurrency from './util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';

const Products = (props) => {
  const [modal, setModal] = useState({
    product: null,
  });

  useEffect(() => {
    props.fetchProducts();
  }, [fetchProducts]);
  //

  const openModalHandler = (product) => {
    setModal({ product: product });
  };

  const closeModalHandler = () => {
    setModal({ product: null });
  };

  const { product } = modal;

  return (
    <div>
      <Fade bottom cascade>
        {!props.products ? (
          <div>Loading...</div>
        ) : (
          <ul className="products">
            {props.products.map((product) => {
              return (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={'#' + product._id}
                      onClick={() => openModalHandler(product)}
                      className="product__image"
                    >
                      <img src={product.image} alt={product.title} />
                      <p>{product.title}</p>
                    </a>
                    <div className="product__price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        onClick={() => props.onAddToCart(product)}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModalHandler}>
          <Zoom>
            <button className="close__modal" onClick={closeModalHandler}>
              x
            </button>
            <div className="product__details">
              <img src={product.image} alt={product.title} />
              <div className="product__details--description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available Sizes{' '}
                  {product.availableSizes.map((x) => (
                    <span>
                      {' '}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product__price">
                  {formatCurrency(product.price)}
                </div>
                <button
                  className="button primary"
                  onClick={() => {
                    props.onAddToCart(product);
                    closeModalHandler();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

// the connect is based on react-redux which connect the data to the dabase
export default connect(
  (state) => ({
    products: state.products.filteredItems,
    //propsName:state.storeName.initialStateName
  }),
  {
    fetchProducts,
  }
)(Products);
