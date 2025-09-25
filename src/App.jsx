import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/pages/Home";
import WemenProduct from "./component/pages/WemenProduct";
import Kids from "./component/pages/Kids";
import NewArrival from "./component/pages/NewArrival";
import Showpie from "./component/pages/Showpie";
import OrganicProduct from "./component/Product/OrganicProduct"; // ✅ Updated Import
import Contact from "./component/pages/Contact";
import BestsellingProdduct from "./component/pages/BestsellingProdduct";
import Offer from "./component/pages/Offer";
import ProductDetailsPage from "./component/pages/ProductDetailsPage";
import MenProductFilter from "./component/pages/MenProductFilter";
import OrderPage from "./component/pages/OrderPage";
import "./index.css";

const App = () => {
  return (
    <>
      <Routes>
        {/* ✅ Home Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* ✅ Category Pages */}
        <Route path="/menproductfilter" element={<MenProductFilter />} />
        <Route path="/wemen-product" element={<WemenProduct />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/new-arrival" element={<NewArrival />} />
        <Route path="/showpiece" element={<Showpie />} />
        <Route path="/organic" element={<OrganicProduct />} /> {/* ✅ Updated Route */}
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/bestselling" element={<BestsellingProdduct />} />
        <Route path="/offer" element={<Offer />} /> */}

        {/* ✅ Product Details + Order Pages */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </>
  );
};

export default App;
