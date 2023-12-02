import { useEffect, useState } from "react"

const useSetProducts = (id) => {
  const [data, setData] = useState({ data: id ? {} : [], loading: true });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/products/${id ? id : ''}`).then(res => {
      if (res.ok) return res.json();
      throw new Error();
    }).then(res => {
      setData({ data: res, loading: false })
    }).catch((_) => {
      setData({ data: id ? {} : [], loading: false })
    });
  }, [id]);

  return data;
}

export default useSetProducts;