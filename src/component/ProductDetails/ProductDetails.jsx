import React, { useState } from "react";

const ProductDetails = ({ product }) => {
  // If product has multiple images, put them in an array
  const productImages = [
    product.image,
    product.image2 || product.image, // fallback if no extra image
    product.image3 || product.image,
  ];

  const [selectedImage, setSelectedImage] = useState(productImages[0]);

  return (
    <div className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Section: Image Gallery */}
      <div className="flex flex-col items-center">
        {/* Main Image */}
        <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-xl shadow-md">
          <img
            src={selectedImage}
            alt={product.product_name}
            className="max-h-[380px] object-contain"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4">
          {productImages.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 p-1 border rounded-lg cursor-pointer transition 
              ${selectedImage === img ? "border-amber-500" : "border-gray-300"}`}
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`thumbnail-${index}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Title & Brand */}
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

          {/* Product Specifications */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold mb-2">Specifications:</h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Fabric:</strong> {product.fabric}
              </li>
              <li>
                <strong>Set Type:</strong> {product.set_type}
              </li>
              <li>
                <strong>Dupatta:</strong> {product.dupatta_material}
              </li>
              <li>
                <strong>Color:</strong> {product.color}
              </li>
              <li>
                <strong>Pattern:</strong> {product.pattern}
              </li>
              <li>
                <strong>Sleeve:</strong> {product.sleeve_length}
              </li>
              <li>
                <strong>Bottom Style:</strong> {product.bottom_style}
              </li>
              <li>
                <strong>Occasion:</strong> {product.occasion}
              </li>
              <li>
                <strong>Available Sizes:</strong> {product.sizes}
              </li>
              <li>
                <strong>SKU:</strong> {product.sku}
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="flex-1 bg-amber-600 text-white py-3 rounded-xl shadow hover:bg-amber-700 transition">
            Add to Cart
          </button>
          <button className="flex-1 border border-amber-600 text-amber-600 py-3 rounded-xl shadow hover:bg-amber-50 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
