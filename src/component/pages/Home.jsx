import Banner from '../Banner/Banner';
import Navber from '../Navber/Navber';
import Product from '../Product/Product';
import React from "react";
import SpecialProducts from '../SpecialProduct/SpecialProducts';
import Contact from './Contact';
import ContactCom from '../Contact/ContactCom';
import ShowpieceProduct from '../Showpiece/ShowpieceProduct';
const Home = () => {
  
 const specialItems = [
    {
      sku: "SP-001",
      product_name: "Premium Cotton Kurti",
      image: "/images/kurti.jpg",
      price_in_tk: 1250,
      discount: 20,
      discount_price: 999,
    },
    {
      sku: "SP-002",
      product_name: "Luxury Silk Saree",
      image: "/images/saree.jpg",
      price_in_tk: 5500,
    },
    {
      sku: "SP-003",
      product_name: "Designer Three Piece",
      image: "/images/3piece.jpg",
      price_in_tk: 2800,
      discount: 15,
      discount_price: 2380,
    },
  ];
  return (
    <>
      <Navber />
      <Banner/>
      <Product/>
      <ShowpieceProduct/>
      <SpecialProducts specialItems={specialItems}/>
      <ContactCom/>
     
    </>
  );
};

export default Home;
