import { useEffect, useState } from 'react';
import './cartPage.css';
import CartRow from '../CartRow';

import Data from '../../mockDb/products.json'

const CartPage = () => {
  const [addedProducts, setAddedProducts] = useState({ data: [...Data.products], loading: false });

  const updateQuantity = (itemId, quantity) => {
    const productsClone = [...addedProducts.data]
    const itemToUpdateIdx = addedProducts.data.findIndex(p => p.id === itemId);
    if (itemToUpdateIdx > -1) {
      productsClone[itemToUpdateIdx] = { ...productsClone[itemToUpdateIdx], quantity }
      setAddedProducts(prevState => ({...prevState, data: productsClone }))
    }
  }

  const deleteProduct = (itemId) => {
    const productsClone = [...addedProducts.data]
    const itemToDeleteIdx = addedProducts.data.findIndex(p => p.id === itemId);
    if (itemToDeleteIdx > -1) {
      productsClone.splice(itemToDeleteIdx, 1);
      setAddedProducts(prevState => ({...prevState, data: productsClone }))
    }
  }

  const addQuantityToAllProducts = (pr) => {
    const updatedProducts = pr.map(item => ({
      ...item,
      quantity: JSON.parse(localStorage.getItem("cart"))[item.id] || 1
    }))
    setAddedProducts({ loading: false, data: updatedProducts })
  }

  useEffect(() => {
    fetch("http://localhost:3001/products").then(res => {
      if (res.ok) return res.json();
    }).then(res => {
      const cartAssoc = JSON.parse(localStorage.getItem("cart")) || {};
      const addedItems = res.filter(product => cartAssoc[product.id]);
      addQuantityToAllProducts(addedItems)
    });
  }, [])

  /* რეალურ პროექტში ყველა პროდუქტს არ მოვითხოვთ სერვერიდან,
  სერვერზე POST მეთოდით უნდა გაიგზავნოს პროდუქტების id - ბის მასივი და backend-სგან ვიღებთ ამ id - ბის შესაბამის პროდუქტების სიას.
  უბრალოდ json სერვერი არ გვაძლევს ამის შესაძლებლობას
  */

  if (addedProducts.loading) return "...loading";

  if (!addedProducts.data.length && !addedProducts.loading) return "No Items added";


  const calculateTotalPrice =  addedProducts.data.reduce((prev, next) =>  prev + next.price * next.quantity, 0)
  return <table>
    <thead>
      <tr>
        <th>Delete product</th>
        <th></th>
        <th>name</th>
        <th>price</th>
        <th>quantity</th>
        <th>subtotal</th>
      </tr>
    </thead>
    <tbody>
      {
        addedProducts.data.map(product => <CartRow item={product} key={product.id} updateQuantity={updateQuantity} deleteProduct={deleteProduct} />)
      }
    <tr>
      <td><b>TOTAL</b></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{calculateTotalPrice}</td>
    </tr>
    </tbody>
  </table>;
}

export default CartPage;