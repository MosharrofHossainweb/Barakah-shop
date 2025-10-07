import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./component/pages/Home";
import WemenProduct from "./component/pages/WemenProduct";
import Kids from "./component/pages/Kids";
import NewArrival from "./component/pages/NewArrival";
import Showpie from "./component/pages/Showpie";
import Organic from "./component/pages/Organic";
import Contact from "./component/pages/Contact";
import ProductDetailsPage from "./component/pages/ProductDetailsPage";
import MenProductFilter from "./component/pages/MenProductFilter";
import OrderPage from "./component/pages/OrderPage";
import "./index.css";

const App = () => {
  const location = useLocation();

  // Track Facebook Pixel PageView on route change
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
      console.log("Facebook Pixel tracked:", location.pathname);
    }
  }, [location]);

  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Category Pages */}
      <Route path="/menproductfilter" element={<MenProductFilter />} />
      <Route path="/wemen-product" element={<WemenProduct />} />
      <Route path="/kids" element={<Kids />} />
      <Route path="/new-arrival" element={<NewArrival />} />
      <Route path="/showpiece" element={<Showpie />} />
      <Route path="/organic" element={<Organic />} />
      <Route path="/contact" element={<Contact />} />

      {/* Product & Order */}
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  );
};

export default App;
