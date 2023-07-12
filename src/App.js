import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=80");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
    //console.log(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != page
    ) {
      setPage(selectedPage);
    }
  };
  //console.log(products);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span key={product.id} className="products__single">
                <img src={product.thumbnail} />
                <span>
                  {product.id}- {product.title}
                </span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__deSelect"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶️
          </span>
          {[...Array(products.length / 8)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__Selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={
              page < products.length / 10 ? "" : "pagination__deSelect"
            }
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀️
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
