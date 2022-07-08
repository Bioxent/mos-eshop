import React, { useState } from "react";

import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/Products/ProductList/ProductList";
// import ProductInput from "./components/Products/ProductInput/ProductInput";
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
  const [products, setProducts] = useState([
    { text: "Pizza", id: "g1" },
    { text: "Sushi", id: "g2" },
    { text: "Burger", id: "g3" },
    { text: "Spaghetti", id: "g4" },
    { text: "Cheese", id: "g5" },
    { text: "Meat", id: "g6" },
    { text: "Bread", id: "g7" },
    { text: "Steak", id: "g8" },
    { text: "Fish", id: "g9" },
  ]);

  let content = (
    <p style={{ textAlign: "center" }}>No goals found. Maybe add one?</p>
  );

  if (products.length > 0) {
    content = (
      <ProductList items={products}/>
    );
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