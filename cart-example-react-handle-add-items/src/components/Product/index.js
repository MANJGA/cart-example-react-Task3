import { useParams } from "react-router-dom";
import useSetProducts from "../../hooks/useSetProducts";

const Product = () => {

  const { id } = useParams();
  const product = useSetProducts(id);

  if (product.loading) return "...loading";

  if (!product.loading && !Object.keys(product.data).length) return "Item not found";

  return (
    <div className="item">
      <div className="item-image"><img src={product.data.imgUrl} className="resp-img" alt={product.data.name} /></div>
      <p><b>Name:</b>{product.data.name}</p>
      <p><b>Price:</b>{product.data.price}$</p>
      <div><b>Description:</b><p>{product.data.description}</p></div>
    </div>
  )
}

export default Product;