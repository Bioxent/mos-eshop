import React from "react";

import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";

const ProductList = (props) => {
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {props.items.map(productItem => (
        <ProductItem
          key={productItem.id}
          id={productItem.id}
          title={productItem.title}
          description={productItem.description}
          imageUrl={productItem.imgUrl}
        >
          {productItem.title}
        </ProductItem>
      ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
