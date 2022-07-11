import React from "react";

import FavoriteProductItem from "../ProductItem/FavoriteProductItem";
import "./FavoriteProductList.css";

const FavoriteProductList = (props) => {
  function deleteFavoriteHandler(clicked) {
    props.onDeleteClick(clicked);
  }

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {props.items.map((productItem) => (
            <FavoriteProductItem
              key={productItem.id}
              id={productItem.id}
              title={productItem.title}
              description={productItem.description}
              imageUrl={productItem.imgUrl}
              onSubmitDelete={deleteFavoriteHandler}
            >
              {productItem.title}
            </FavoriteProductItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductList;
