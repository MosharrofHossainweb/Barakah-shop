import React, { useState } from "react";
import { Link } from "react-router-dom";
import organicData from "../../DB/organicData"; // তোমার organicData import
import { useThemeContext } from "../../context/ThemeProvider";

const OrganicProduct = () => {
  const { mode } = useThemeContext();
  const [filters, setFilters] = useState({
    category: "All",
    discount: false,
    priceRange: "All",
  });

  const applyFilters = () => {
    return organicData.filter((item) => {
      const matchCategory =
        filters.category === "All" || item.category === filters.category;
      const matchDiscount = !filters.discount || item.discount;
      const matchPrice =
        filters.priceRange === "All" ||
        (filters.priceRange === "low" && item.price_in_tk < 500) ||
        (filters.priceRange === "mid" &&
          item.price_in_tk >= 500 &&
          item.price_in_tk <= 1500) ||
        (filters.priceRange === "high" && item.price_in_tk > 1500);

      return matchCategory && matchDiscount && matchPrice;
    });
  };

  const filteredData = applyFilters();

  const clearFilters = () =>
    setFilters({ category: "All", discount: false, priceRange: "All" });

  const textColor = mode === "light" ? "text-gray-700" : "text-gray-200";
  const cardBg = mode === "light" ? "bg-white" : "bg-gray-800";
  const cardText = mode === "light" ? "text-gray-700" : "text-gray-100";
  const priceText = mode === "light" ? "text-gray-800" : "text-gray-100";
  const badgeBg = "bg-green-700";

  return (
    <div
      className={`${
        mode === "dark" ? "bg-gray-900" : "bg-gray-100"
      } container mx-auto py-10`}
    >
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h1
          className={`text-4xl font-extrabold tracking-wide uppercase ${
            mode === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Organic Food Collection
        </h1>
        <p className={`text-lg mt-2 ${textColor}`}>
          100% fresh, chemical-free organic products for a healthy lifestyle.
        </p>
        <div className="w-28 h-1 bg-green-700 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Filter Panel */}
      <div
        className={`${cardBg} border shadow-md rounded-2xl p-6 mb-10 max-w-4xl mx-auto`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="flex flex-col">
            <label className={`text-sm font-semibold mb-1 ${textColor}`}>
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-600 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="All">All Categories</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Dairy">Dairy</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col">
            <label className={`text-sm font-semibold mb-1 ${textColor}`}>
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceRange: e.target.value }))
              }
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-600 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="All">All Prices</option>
              <option value="low">Below 500৳</option>
              <option value="mid">500৳ - 1500৳</option>
              <option value="high">Above 1500৳</option>
            </select>
          </div>

          {/* Discount Filter + Clear Button */}
          <div className="flex flex-col justify-center gap-3 col-span-2 md:col-span-1">
            <label className={`flex items-center gap-2 text-sm font-semibold ${textColor}`}>
              <input
                type="checkbox"
                checked={filters.discount}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, discount: e.target.checked }))
                }
                className="w-4 h-4 accent-green-700"
              />
              Discount Only
            </label>

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Link key={index} to={`/product/${item.sku}`}>
              <div
                className={`${cardBg} w-[300px] h-[450px] relative flex flex-col border rounded-lg shadow-lg hover:shadow-2xl transition hover:scale-[1.02]`}
              >
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
                <div className="card_image w-full h-[240px] overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="max-h-[240px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h2 className={`text-lg font-semibold ${cardText}`}>
                    {item.product_name}
                  </h2>
                  <div className="mt-2">
                    {item.discount ? (
                      <>
                        <span className="line-through text-sm text-gray-400">
                          {item.price_in_tk}৳
                        </span>
                        <span className={`ml-2 font-bold text-lg ${priceText}`}>
                          {item.discount_price}৳
                        </span>
                      </>
                    ) : (
                      <span className={`font-bold text-lg ${priceText}`}>
                        {item.price_in_tk}৳
                      </span>
                    )}
                  </div>
                  <ul className={`list-disc list-inside mt-2 text-sm ${cardText}`}>
                    <li>Brand: <span className="text-green-500">{item.brand}</span></li>
                    <li>Category: <span className="text-green-500">{item.category}</span></li>
                    <li>Weight: <span className="text-green-500">{item.weight}</span></li>
                    <li>Origin: <span className="text-green-500">{item.origin}</span></li>
                  </ul>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={`${textColor} text-lg`}>No organic products match the filter.</p>
        )}
      </div>
    </div>
  );
};

export default OrganicProduct;
