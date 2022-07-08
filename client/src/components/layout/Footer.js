import { Routes, Route, Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div className="col mb-3">
          <a
            href="/"
            className="d-flex align-items-center mb-3 link-dark text-decoration-none"
          ></a>
          <p className="text-muted">&copy; eshop 2022</p>
        </div>

        <div className="col mb-3"></div>
        <div className="col mb-3"><h5>footer</h5></div>
        <div className="col mb-3"></div>

        <div className="col mb-3">
          <h5>nav</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link p-0 text-muted" to="/catalog">
                catalog
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link p-0 text-muted" to="/about">
                about
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link p-0 text-muted" to="/contact">
                contact
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
