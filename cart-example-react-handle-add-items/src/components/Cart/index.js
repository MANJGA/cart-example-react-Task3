import { Link } from "react-router-dom";
import { useContext } from 'react';
import './cart.css';
import CartContext from '../../contexts/cartContext';

const Cart = () => {
  let total = 0;
  const { cartItems } = useContext(CartContext);
  const cartProductQuantities = Object.values(cartItems);
  if (cartProductQuantities.length) {
    total = cartProductQuantities.reduce((prev, next) => prev + next);
  }
  return (<div id='cart'><Link to="cart" className="no-decor"><i className="fa fa-shopping-cart"></i>{total}</Link></div>);
}

export default Cart;