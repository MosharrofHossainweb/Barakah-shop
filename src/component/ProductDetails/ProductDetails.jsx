import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const ProductDetails = ({ product = {} }) => {
  // Build image list and remove falsy values
  const productImages = [product?.image, product?.image2, product?.image3].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState("");

  // Set initial selected image when images become available
  useEffect(() => {
    if (productImages.length) setSelectedImage(productImages[0]);
  }, [productImages]);

  // Simple loader / fallback while product is not ready
  if (!product || Object.keys(product).length === 0) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  const displayPrice = product?.discount ? product?.discount_price : product?.price_in_tk;

  return (
    <div className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: Images */}
      <div className="flex flex-col items-center">
        <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-xl shadow-md">
          <img
            src={selectedImage || productImages[0] || "/placeholder.png"}
            alt={product?.product_name ?? "product image"}
            className="max-h-[380px] object-contain"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4">
          {productImages.length ? (
            productImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 p-1 border rounded-lg cursor-pointer transition ${
                  selectedImage === img ? "border-amber-500" : "border-gray-300"
                }`}
                aria-label={`Select thumbnail ${idx + 1}`}
              >
                <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-contain" />
              </button>
            ))
          ) : (
            <div className="text-sm text-gray-500">No images available</div>
          )}
        </div>
      </div>

      {/* Right: Info & Actions */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product?.product_name ?? "Untitled"}</h1>
          <p className="text-sm text-gray-500 mt-1">Brand: {product?.brand ?? "—"}</p>

          {/* Price */}
          <div className="mt-3">
            {product?.discount ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  {product?.price_in_tk ? `${product.price_in_tk}৳` : "—"}
                </span>
                <span className="text-amber-600 font-bold text-2xl ml-3">
                  {product?.discount_price ? `${product.discount_price}৳` : "—"}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold text-2xl">
                {displayPrice ? `${displayPrice}৳` : "—"}
              </span>
            )}
          </div>

          {/* Specs */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold mb-2">Specifications:</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Fabric:</strong> {product?.fabric ?? "—"}</li>
              <li><strong>Set Type:</strong> {product?.set_type ?? "—"}</li>
              <li><strong>Dupatta:</strong> {product?.dupatta_material ?? "—"}</li>
              <li><strong>Color:</strong> {product?.color ?? "—"}</li>
              <li><strong>Pattern:</strong> {product?.pattern ?? "—"}</li>
              <li><strong>Sleeve:</strong> {product?.sleeve_length ?? "—"}</li>
              <li><strong>Bottom Style:</strong> {product?.bottom_style ?? "—"}</li>
              <li><strong>Occasion:</strong> {product?.occasion ?? "—"}</li>
              <li><strong>Available Sizes:</strong> {product?.sizes ?? "—"}</li>
              <li><strong>SKU:</strong> {product?.sku ?? "—"}</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 bg-amber-600 text-white py-3 rounded-xl shadow hover:bg-amber-700 transition"
              aria-label="Add to cart"
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="flex-1 border border-amber-600 text-amber-600 py-3 rounded-xl shadow hover:bg-amber-50 transition"
              aria-label="Buy now"
            >
              Buy Now
            </button>
          </div>

          {/* WhatsApp Buttons */}
          <a
            href="https://wa.me/8801959495293"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
            aria-label="WhatsApp 01959-495293"
          >
            <FaWhatsapp className="text-xl" />
            WhatsApp: +880 1959-495293
          </a>

          <a
            href="https://wa.me/8801617555633"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
            aria-label="WhatsApp 01617-555633"
          >
            <FaWhatsapp className="text-xl" />
            WhatsApp: +880 1617-555633
          </a>

          {/* Continue Shopping */}
          <Link
            to="/"
            className="text-center bg-gray-100 border border-gray-300 text-gray-700 py-3 rounded-xl shadow hover:bg-gray-200 transition"
            aria-label="Continue shopping"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
