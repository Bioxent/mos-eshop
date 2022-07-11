import React from "react";
import FavoriteProductList from "../components/Products/ProductList/FavoriteProductList";
const Favorites = (props) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/checkUser")
      .then((res) => res.json())
      .then((data) => setData(data.username));
  }, []);

  const [favorites, setFavorites] = React.useState(null);

  React.useEffect(() => {
    fetch("/getFavorites")
      .then((res) => res.json())
      .then((favorites) => setFavorites(favorites.favorites));
  }, []);

  function deleteClickHandler(clicked) {
    console.log(clicked);

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data, id: clicked }),
    };
    fetch("/deleteFavorite", requestOptions);
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  }

  console.log("favorites inside the page:");
  console.log(favorites);
  let content = <p style={{ textAlign: "center" }}>No favorites found.</p>;
  if (favorites) {
    content = (
      <FavoriteProductList
        items={favorites}
        onDeleteClick={deleteClickHandler}
      />
    );
  }
  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <p>Logged in as: {!data ? "Nobody" : data}</p>
        <h1 className="display-4 fw-normal">Favorites</h1>
        {content}
      </div>
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  );
};

export default Favorites;
