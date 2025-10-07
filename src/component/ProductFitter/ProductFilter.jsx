// ✅ ProductSection.jsx (Filter removed version)
import React from "react";
import { Link } from "react-router-dom";
import bdData from "../../DB/Db";
import { useThemeContext } from "../../context/ThemeProvider";

const ProductSection = () => {
  const { mode } = useThemeContext();
  const isLight = mode === "light";

  // 🎨 Theme-based styles
  const textColor = isLight ? "text-gray-700" : "text-gray-200";
  const cardBg = isLight ? "bg-white" : "bg-gray-800";
  const cardText = isLight ? "text-gray-700" : "text-gray-100";
  const priceText = isLight ? "text-gray-800" : "text-gray-100";
  const badgeBg = "bg-red-500";

  return (
    <div className={`${isLight ? "bg-gray-50" : "bg-gray-900"} py-10`}>
      {/* 🏷️ Section Heading */}
      <div className="text-center mb-6 px-4 sm:px-6">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide uppercase ${cardText}`}
        >
          Women’s Collection
        </h1>
        <p className={`text-sm sm:text-base md:text-lg mt-2 ${textColor}`}>
          Discover the perfect outfit from our premium selection of fabrics, colors, and styles.
        </p>
        <div className="w-20 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* 🛍️ Product Cards Section */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-2 sm:px-4">
        {bdData.length > 0 ? (
          bdData.map((item) => (
            <Link
              key={item.sku}
              to={`/product/${item.sku}`}
              className="w-[280px] sm:w-[300px] md:w-[320px]"
            >
              {/* 🧾 Single Product Card */}
              <div
                className={`${cardBg} flex flex-col border rounded-lg shadow-lg hover:shadow-2xl transition hover:scale-[1.02] relative`}
              >
                {/* 🔖 Discount Badge */}
                {item.discount && (
                  <div
                    className={`px-2 py-1 text-xs sm:text-sm font-medium top-2 right-2 rounded-md ${badgeBg} text-white absolute shadow`}
                  >
                    {Math.round(
                      ((item.price_in_tk - item.discount_price) / item.price_in_tk) * 100
                    )}
                    % OFF
                  </div>
                )}

                {/* 🖼️ Product Image */}
                <div className="w-full h-[200px] sm:h-[240px] overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    loading="lazy" // ✅ Lazy loading for better performance
                    className="max-h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* 📄 Product Details */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                  {/* 🧵 Product Name */}
                  <h2 className={`text-sm sm:text-base md:text-lg font-semibold ${cardText}`}>
                    {item.product_name}
                  </h2>

                  {/* 💰 Product Price */}
                  <div className="mt-1 sm:mt-2 flex items-center gap-2">
                    {item.discount ? (
                      <>
                        <span className="line-through text-gray-400 text-xs sm:text-sm">
                          {item.price_in_tk}৳
                        </span>
                        <span
                          className={`ml-1 sm:ml-2 font-bold text-sm sm:text-base ${priceText}`}
                        >
                          {item.discount_price}৳
                        </span>
                      </>
                    ) : (
                      <span
                        className={`font-bold text-sm sm:text-base ${priceText}`}
                      >
                        {item.price_in_tk}৳
                      </span>
                    )}
                  </div>

                  {/* 📋 Product Info */}
                  <ul
                    className={`list-disc list-inside mt-1 text-xs sm:text-sm ${cardText}`}
                  >
                    <li>
                      Brand: <span className="text-red-500">{item.brand}</span>
                    </li>
                    <li>
                      Fabric: <span className="text-red-500">{item.fabric}</span>
                    </li>
                    <li>
                      Type: <span className="text-red-500">{item.set_type}</span>
                    </li>
                    <li>
                      Color: <span className="text-red-500">{item.color}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={`${textColor} text-sm sm:text-base md:text-lg`}>
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
