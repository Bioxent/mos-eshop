import React from "react";

const Favorites = (props) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/checkUser")
      .then((res) => res.json())
      .then((data) => setData(data.username));
  }, []);

  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <h1 className="display-4 fw-normal">Favorites</h1>
        <p className="lead fw-normal">
          favorites here
        </p>
        <p>Logged in as: {!data ? "Nobody" : data}</p>
      </div>
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  );
};

export default Favorites;
