import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import "./ProductDetail.css";

const ProductDetail = (props) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/checkUser")
      .then((res) => res.json())
      .then((data) => setData(data.username));
  }, []);

  let location = useLocation();
  console.log("data here from product details: " + location);
  console.log(location);

  function clickHandler(event) {
    console.log("clicked");

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data, newFavorite: location.state.id }),
    };
    fetch("/updateUser", requestOptions);
  }

  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">{location.state.title}</h1>
          <p className="col-md-12 fs-4">{location.state.description}</p>
          {data ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={clickHandler}
            >
              Add to favorites
            </button>
          ) : (
            <p className="col-md-12 fs-4">Login to add to favorites</p>
          )}
        </div>
        <img
          src={location.state.imgUrl}
          className="img-fluid"
          alt="product_image"
          width="450"
        />
      </div>
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  );
};

export default ProductDetail;
