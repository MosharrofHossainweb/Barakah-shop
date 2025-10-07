import React from "react";
import { Link } from "react-router-dom";
import menData from "../../DB/MenDb";
import Navber from "../Navber/Navber";
import { useThemeContext } from "../../context/ThemeProvider";

const MenProduct = () => {
  const { mode } = useThemeContext();

  // Theme Colors
  const textColor = mode === "light" ? "text-gray-700" : "text-gray-200";
  const cardBg = mode === "light" ? "bg-white" : "bg-gray-800";
  const cardText = mode === "light" ? "text-gray-700" : "text-gray-100";
  const priceText = mode === "light" ? "text-gray-800" : "text-gray-100";
  const badgeBg = "bg-blue-700";

  return (
    <>
      <Navber />
      <div
        className={`${
          mode === "dark" ? "bg-gray-900" : "bg-gray-100"
        } container mx-auto py-10`}
      >
        {/* Section Heading */}
        <div className="text-center mb-6">
          <h1
            className={`text-3xl md:text-4xl font-extrabold tracking-wide uppercase ${
              mode === "light" ? "text-gray-800" : "text-gray-100"
            }`}
          >
            Men’s Panjabi Collection
          </h1>
          <p className={`text-base md:text-lg mt-2 ${textColor}`}>
            Explore elegant Panjabis and traditional wear for every occasion.
          </p>
          <div className="w-24 md:w-28 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {menData.length > 0 ? (
            menData.map((item, index) => (
              <Link key={index} to={`/product/${item.sku}`}>
                <div
                  className={`${cardBg} w-[280px] sm:w-[300px] h-[420px] sm:h-[450px] relative flex flex-col border rounded-lg shadow-lg hover:shadow-2xl transition hover:scale-[1.02]`}
                >
                  {item.discount && (
                    <div
                      className={`px-2 py-0.5 text-xs font-medium top-2 right-2 rounded-md ${badgeBg} text-white absolute shadow`}
                    >
                      {Math.round(
                        ((item.price_in_tk - item.discount_price) /
                          item.price_in_tk) *
                          100
                      )}
                      % OFF
                    </div>
                  )}
                  <div className="card_image w-full h-[220px] sm:h-[240px] overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="max-h-[220px] sm:max-h-[240px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                    <h2 className={`text-base sm:text-lg font-semibold ${cardText}`}>
                      {item.product_name}
                    </h2>
                    <div className="mt-1 sm:mt-2">
                      {item.discount ? (
                        <>
                          <span className="line-through text-xs sm:text-sm text-gray-400">
                            {item.price_in_tk}৳
                          </span>
                          <span
                            className={`ml-2 font-bold text-base sm:text-lg ${priceText}`}
                          >
                            {item.discount_price}৳
                          </span>
                        </>
                      ) : (
                        <span
                          className={`font-bold text-base sm:text-lg ${priceText}`}
                        >
                          {item.price_in_tk}৳
                        </span>
                      )}
                    </div>
                    <ul
                      className={`list-disc list-inside mt-2 text-xs sm:text-sm ${cardText}`}
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
            <p className={`${textColor} text-lg`}>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MenProduct;
