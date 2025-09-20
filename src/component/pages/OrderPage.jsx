// OrderPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const { product, size, quantity } = location.state || {};
  const mode = location.state?.mode || "light";
  const isLight = mode === "light";

  if (!product) {
    return (
      <div className={`${isLight ? "bg-gray-100" : "bg-gray-900"} min-h-screen flex items-center justify-center`}>
        <p className={`${isLight ? "text-gray-800" : "text-gray-100"} text-lg`}>No product selected.</p>
      </div>
    );
  }

  const totalPrice = quantity * (product.discount_price || product.price_in_tk);

  return (
    <div className={`${isLight ? "bg-gray-100" : "bg-gray-900"} min-h-screen flex flex-col items-center py-10`}>
      <h1 className={`text-3xl font-bold mb-6 ${isLight ? "text-gray-800" : "text-gray-100"}`}>Order Summary</h1>

      <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md`}>
        <img
          src={product.image}
          alt={product.product_name}
          className="w-full h-64 object-contain rounded-lg mb-4"
        />
        <h2 className={`text-2xl font-semibold mb-2 ${isLight ? "text-gray-800" : "text-gray-100"}`}>
          {product.product_name}
        </h2>
        <p className={`${isLight ? "text-gray-700" : "text-gray-200"}`}>Brand: {product.brand}</p>
        <p className={`${isLight ? "text-gray-700" : "text-gray-200"}`}>Size: {size}</p>
        <p className={`${isLight ? "text-gray-700" : "text-gray-200"}`}>Quantity: {quantity}</p>
        <p className={`text-xl font-bold mt-2 ${isLight ? "text-gray-800" : "text-gray-100"}`}>Total: {totalPrice}৳</p>

        <a
          href={`https://wa.me/8801617555633?text=I%20want%20to%20order%20${encodeURIComponent(
            product.product_name
          )}%20Size:%20${size}%20Quantity:%20${quantity}%20Total:${totalPrice}৳`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full text-center bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
        >
          Place Order via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default OrderPage;
