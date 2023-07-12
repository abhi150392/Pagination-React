import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
    //console.log(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //console.log(products);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
