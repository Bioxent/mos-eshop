import React, { useState } from "react";

import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/Products/ProductList/ProductList";
import MainNavBar from "./components/layout/MainNavBar";
import Footer from "./components/layout/Footer";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [productList, setProductList] = React.useState(null);

  React.useEffect(() => {
    fetch("/getProducts")
      .then((res) => res.json())
      .then((productList) => setProductList(productList.products));
  }, []);

  let content = <p style={{ textAlign: "center" }}>No products found.</p>;

  if (productList) {
    content = <ProductList items={productList} />;
  }

  return (
    <div>
      <MainNavBar />
      <Routes>
        <Route path="/" element={<Catalog productList={content} />} />
        <Route path="/catalog" element={<Catalog productList={content} />} />
        <Route path="/catalog/:productId" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
