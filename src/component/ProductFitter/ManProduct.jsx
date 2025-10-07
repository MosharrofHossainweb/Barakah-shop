// ✅ ManProduct.jsx
import React from "react";
import { Link } from "react-router-dom";
import menData from "../../DB/MenDb";
import { useThemeContext } from "../../context/ThemeProvider";

const ManProduct = () => {
  const { mode } = useThemeContext();

  // 🎨 Theme-based colors
  const textColor = mode === "light" ? "text-gray-700" : "text-gray-200";
  const cardBg = mode === "light" ? "bg-white" : "bg-gray-800";
  const cardText = mode === "light" ? "text-gray-700" : "text-gray-100";
  const priceText = mode === "light" ? "text-gray-800" : "text-gray-100";
  const badgeBg = "bg-blue-700";

  return (
    <>
      {/* 🌙 Main Container */}
      <div
        className={`${
          mode === "dark" ? "bg-gray-900" : "bg-gray-100"
        } container mx-auto py-10`}
      >
        {/* 🏷️ Section Heading */}
        <div className="text-center mb-10">
          <h1
            className={`text-4xl font-extrabold tracking-wide uppercase ${
              mode === "light" ? "text-gray-800" : "text-gray-100"
            }`}
          >
            Men’s Panjabi Collection
          </h1>
          <p className={`text-lg mt-2 ${textColor}`}>
            Explore elegant Panjabis and traditional wear for every occasion.
          </p>
          <div className="w-28 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 🛍️ Product Cards Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {menData.length > 0 ? (
            menData.map((item, index) => (
              <Link key={index} to={`/product/${item.sku}`}>
                {/* 🧾 Single Product Card */}
                <div
                  className={`${cardBg} w-[300px] h-[450px] relative flex flex-col border rounded-lg shadow-lg hover:shadow-2xl transition hover:scale-[1.02]`}
                >
                  {/* 🔖 Discount Badge */}
                  {item.discount && (
                    <div
                      className={`px-3 py-1 text-sm font-medium top-2 right-2 rounded-md ${badgeBg} text-white absolute shadow`}
                    >
                      {Math.round(
                        ((item.price_in_tk - item.discount_price) /
                          item.price_in_tk) *
                          100
                      )}
                      % OFF
                    </div>
                  )}

                  {/* 🖼️ Product Image */}
                  <div className="card_image w-full h-[240px] overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="max-h-[240px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* 📄 Product Details */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h2 className={`text-lg font-semibold ${cardText}`}>
                      {item.product_name}
                    </h2>

                    {/* 💰 Price Section */}
                    <div className="mt-2">
                      {item.discount ? (
                        <>
                          <span className="line-through text-sm text-gray-400">
                            {item.price_in_tk}৳
                          </span>
                          <span
                            className={`ml-2 font-bold text-lg ${priceText}`}
                          >
                            {item.discount_price}৳
                          </span>
                        </>
                      ) : (
                        <span className={`font-bold text-lg ${priceText}`}>
                          {item.price_in_tk}৳
                        </span>
                      )}
                    </div>

                    {/* 📋 Product Specifications */}
                    <ul
                      className={`list-disc list-inside mt-2 text-sm ${cardText}`}
                    >
                      <li>
                        Brand:{" "}
                        <span className="text-blue-500">{item.brand}</span>
                      </li>
                      <li>
                        Fabric:{" "}
                        <span className="text-blue-500">{item.fabric}</span>
                      </li>
                      <li>
                        Type:{" "}
                        <span className="text-blue-500">{item.set_type}</span>
                      </li>
                      <li>
                        Color:{" "}
                        <span className="text-blue-500">{item.color}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className={`${textColor} text-lg`}>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ManProduct;
