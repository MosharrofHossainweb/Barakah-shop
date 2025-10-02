import React, { Suspense, lazy } from "react";
import Navber from "../Navber/Navber";

const Banner = lazy(() => import("../Banner/Banner"));
const Product = lazy(() => import("../Product/Product"));
const ShowpieceProduct = lazy(() => import("../Showpiece/ShowpieceProduct"));
const OrganicProduct = lazy(() => import("../Product/OrganicProduct"));
const ContactCom = lazy(() => import("../Contact/ContactCom"));

const Home = () => {
  return (
    <>
      <Navber />

      <Suspense fallback={<div className="text-center py-20">Loading Banner...</div>}>
        <Banner />
      </Suspense>

      <Suspense fallback={<div className="text-center py-20">Loading Products...</div>}>
        <Product />
      </Suspense>

      <Suspense fallback={<div className="text-center py-20">Loading Showpiece...</div>}>
        <ShowpieceProduct />
      </Suspense>

      <Suspense fallback={<div className="text-center py-20">Loading Organic Products...</div>}>
        <OrganicProduct />
      </Suspense>

      <Suspense fallback={<div className="text-center py-20">Loading Contact Section...</div>}>
        <ContactCom />
      </Suspense>
    </>
  );
};

export default Home;
