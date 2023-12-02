import './mainPage.css'
import ItemList from "../ItemsList";
import Cart from '../Cart';
import { useState } from 'react';
import CartContext from '../../contexts/cartContext';
import useSetProducts from '../../hooks/useSetProducts';


const MainPage = () => {
  const defaultCartState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
  const products = useSetProducts();
  const [cartItems, setCartItems] = useState(defaultCartState);
  if (products.loading) return "...loading";

  return <CartContext.Provider value={{ cartItems, setCartItems }}>
    <ItemList data={products.data} />
    <Cart />
  </CartContext.Provider>;
}

export default MainPage;