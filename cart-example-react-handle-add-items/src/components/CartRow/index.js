const CartRow = ({ item, updateQuantity, deleteProduct }) => {
  const { id, name, price, imgUrl, quantity } = item;
  const sanitizeQuantity = Number.isNaN(quantity) ? '' : parseInt(quantity)
  return <tr key={`product-${id}`}>
    <td>
      <button onClick={() => deleteProduct(id)}>Remove</button>
    </td>
    <td className='prod-img '><img className="resp-img" src={imgUrl} alt={name} /></td>
    <td>{name}</td>
    <td>{price}</td>
    <td>
      <input
        min={1}
        type="number"
        value={sanitizeQuantity}
        onChange={(e) => updateQuantity(id, parseInt(e.target.value))}
      />
    </td>
    <td>{price * (sanitizeQuantity || 0)}</td>
  </tr>
}

export default CartRow