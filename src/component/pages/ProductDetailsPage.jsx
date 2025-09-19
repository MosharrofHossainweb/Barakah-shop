// ProductDetailsPage.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import menData from "../../DB/MenDb";
import bdData from "../../DB/Db";
import { useThemeContext } from "../../context/ThemeProvider";
import Navber from "../Navber/Navber";

const ProductDetailsPage = () => {
  const { mode } = useThemeContext();
  const isLight = mode === "light";
  const { id } = useParams();
  const navigate = useNavigate();

  const product =
    menData.find((p) => p.sku === id) || bdData.find((p) => p.sku === id);

  const [mainImage, setMainImage] = useState(product?.image);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!product)
    return (
      <p
        className={`${
          isLight ? "text-gray-800" : "text-gray-100"
        } text-center mt-10`}
      >
        Product not found
      </p>
    );

  const youtubeEmbedUrl = "https://www.youtube.com/embed/KdxvBcuUumw?autoplay=1";

  return (
   <>
   <Navber />
    <div className={`${isLight ? "bg-gray-100" : "bg-gray-900"} min-h-screen`}>
      {/* Back link */}
      

      <div className="container mx-auto px-5 md:px-0 flex flex-col lg:flex-row gap-10 py-10">
        {/* Left: Image slider + video */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {/* Main Image */}
          <div className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg h-[450px] md:h-[500px]">
            <img
              src={mainImage}
              alt={product.product_name}
              className="max-h-full w-auto object-contain rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto">
            {[product.image, "/src/assets/sample2.png", "/src/assets/sample3.png"].map(
              (img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer flex-shrink-0 border-2 ${
                    mainImage === img ? "border-blue-600" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              )
            )}
          </div>

          {/* Video Player Box */}
          <div
            className="relative cursor-pointer mt-6 w-full h-[300px] md:h-[360px] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center"
            onClick={() => setIsVideoPlaying(true)}
          >
            {!isVideoPlaying ? (
              <>
                <img
                  src={`https://img.youtube.com/vi/KdxvBcuUumw/hqdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-6.586-3.792A1 1 0 007 8.108v7.784a1 1 0 001.166.972l6.586-1.2a1 1 0 00.752-.972v-3.404a1 1 0 00-.752-.972z"
                      />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={youtubeEmbedUrl}
                title="Product Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2 flex flex-col gap-4 text-gray-900 dark:text-gray-100">
          <h1 className="text-3xl font-bold">{product.product_name}</h1>
          <p className="text-lg">
            Brand: <span className="text-blue-500">{product.brand}</span>
          </p>
          <p>
            Fabric: <span className="text-blue-500">{product.fabric}</span>
          </p>
          <p>
            Type: <span className="text-blue-500">{product.set_type}</span>
          </p>
          <p>
            Color: <span className="text-blue-500">{product.color}</span>
          </p>

          <div className="mt-3">
            {product.discount ? (
              <>
                <span className="line-through text-gray-400">{product.price_in_tk}৳</span>
                <span className="ml-2 text-2xl font-bold text-amber-600">{product.discount_price}৳</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{product.price_in_tk}৳</span>
            )}
          </div>

          <p className="mt-5">{product.description || "No description available."}</p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/order")}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/order")}
              className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition"
            >
              Buy Now
            </button>
            <a
              href="https://wa.me/88016175556333"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              WhatsApp 1
            </a>
            <a
              href="https://wa.me/8801959495293"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              WhatsApp 2
            </a>
            <a
              href="https://m.me/yourpageid"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Messenger
            </a>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default ProductDetailsPage;
