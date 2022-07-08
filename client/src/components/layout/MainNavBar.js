import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function MainNavigation() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/checkUser")
      .then((res) => res.json())
      .then((data) => setData(data.username));
  }, []);

  
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Tenth navbar example"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample08"
          aria-controls="navbarsExample08"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample08"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                eshop
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">
                catalog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                about
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                contact
              </Link>
            </li>
            <li className="nav-item">
              
              {data ? <Link className="nav-link" to="/favorites">
                favorites
              </Link> : null}
            </li>
            <li className="nav-item">
              
              {!data ? <Link className="nav-link" to="/login">
                login
              </Link> : <Link className="nav-link" to="/logout">
                logout
              </Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
