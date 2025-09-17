import React, { useState } from "react";
import { useParams } from "react-router-dom";
import bdData from "../../DB/Db";
import Navber from "../Navber/Navber";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = bdData.find((p) => p.sku === id);

  if (!product) {
    return <h2 className="text-center text-red-500 text-xl mt-10">Product not found</h2>;
  }

  // Collect multiple images (image2, image3 must be added in Db.js)
  const productImages = [product.image, product.image2, product.image3].filter(Boolean);

  // ✅ Add your product video link in Db.js (for example: product.video = "https://www.youtube.com/embed/your-video-id")
  const productVideo = product.video || null;

  // WhatsApp Number
  const whatsappNumber = "880617555633";

  return (
    <>
      <Navber />
      <div className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image Slider */}
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            className="rounded-xl shadow-md"
          >
            {productImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-xl">
                  <img
                    src={img}
                    alt={`product-${index}`}
                    className="max-h-[380px] object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ Product Video Section */}
          {productVideo && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Watch Product Video:</h3>
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  className="w-full h-[300px] md:h-[400px] rounded-xl shadow-md"
                  src={productVideo}
                  title="Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.product_name}</h1>
          <p className="text-sm text-gray-500 mt-1">Brand: {product.brand}</p>

          {/* Price Section */}
          <div className="mt-3">
            {product.discount ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  {product.price_in_tk}৳
                </span>
                <span className="text-amber-600 font-bold text-2xl ml-3">
                  {product.discount_price}৳
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold text-2xl">
                {product.price_in_tk}৳
              </span>
            )}
          </div>

          {/* Specifications */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold mb-2">Specifications:</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Fabric:</strong> {product.fabric}</li>
              <li><strong>Set Type:</strong> {product.set_type}</li>
              <li><strong>Dupatta:</strong> {product.dupatta_material}</li>
              <li><strong>Color:</strong> {product.color}</li>
              <li><strong>Pattern:</strong> {product.pattern}</li>
              <li><strong>Sleeve:</strong> {product.sleeve_length}</li>
              <li><strong>Bottom Style:</strong> {product.bottom_style}</li>
              <li><strong>Occasion:</strong> {product.occasion}</li>
              <li><strong>Available Sizes:</strong> {product.sizes}</li>
              <li><strong>SKU:</strong> {product.sku}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-4">
            {/* WhatsApp Buy Now */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi! I want to buy ${product.product_name} (SKU: ${product.sku}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
            >
              💬 Buy Now on WhatsApp
            </a>

            {/* Messenger Button */}
            <a
              href="https://m.me/your-facebook-page-id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              📩 Message on Messenger
            </a>

            {/* Add to Cart Button */}
            <button className="flex items-center justify-center bg-amber-600 text-white py-3 rounded-xl shadow hover:bg-amber-700 transition">
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
