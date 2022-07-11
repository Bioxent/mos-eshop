import React from "react";

const About = (props) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/logout")
      .then((res) => res.json())
      .then((data) => setData(data.username));
  }, []);
  if (!data) {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  }
  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <p className="lead fw-normal">You have logged out</p>
      </div>
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  );
};

export default About;
