import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './component/pages/Home';
import ManProduct from './component/pages/ManProduct';
import WemenProduct from './component/pages/WemenProduct';
import Kids from './component/pages/Kids';
import NewArrival from './component/pages/NewArrival';
import Showpie from './component/pages/Showpie';
import Organic from './component/pages/Organic';
import Contact from './component/pages/Contact';
import BestsellingProdduct from './component/pages/BestsellingProdduct';
import Offer from './component/pages/Offer';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Root route */}
        <Route path="/home" element={<Home />} />
        <Route path="/man-product" element={<ManProduct />} />
        <Route path="/wemen-product" element={<WemenProduct />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/new-arrival" element={<NewArrival />} />
        <Route path="/showpie" element={<Showpie />} />
        <Route path="/organic" element={<Organic />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bestselling" element={<BestsellingProdduct />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </>
  );
};

export default App;
