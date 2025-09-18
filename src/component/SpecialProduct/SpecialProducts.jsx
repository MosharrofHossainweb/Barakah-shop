// src/components/SpecialProductsCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const SpecialProductsCard = ({ products = [] }) => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          ✨ Special Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Product Image */}
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.product_name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between h-[160px]">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {product.product_name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  {product.discount_price ? (
                    <>
                      <span className="text-amber-600 font-bold text-lg">
                        {product.discount_price}৳
                      </span>
                      <span className="text-gray-400 text-sm line-through">
                        {product.price_in_tk}৳
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-800 font-bold text-lg">
                      {product.price_in_tk}৳
                    </span>
                  )}
                </div>

                <Link
                  to={`/product/${product.sku}`}
                  className="mt-3 text-center bg-amber-600 text-white py-2 rounded-xl hover:bg-amber-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialProductsCard;
