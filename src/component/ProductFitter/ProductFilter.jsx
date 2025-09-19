import React, { useState } from "react";
import { Link } from "react-router-dom";
import bdData from "../../DB/Db";
import { useThemeContext } from "../../context/ThemeProvider"; // ✅ Theme Context

const ProductFilter = () => {
  const { mode } = useThemeContext(); // dark / light
  const isLight = mode === "light";

  const [filters, setFilters] = useState({
    fabric: "All",
    color: "All",
    discount: false,
    priceRange: "All",
  });

  const applyFilters = () => {
    return bdData.filter((item) => {
      const matchFabric =
        filters.fabric === "All" || item.fabric === filters.fabric;
      const matchColor = filters.color === "All" || item.color === filters.color;
      const matchDiscount = !filters.discount || item.discount;
      const matchPrice =
        filters.priceRange === "All" ||
        (filters.priceRange === "low" && item.price_in_tk < 1500) ||
        (filters.priceRange === "mid" &&
          item.price_in_tk >= 1500 &&
          item.price_in_tk <= 3000) ||
        (filters.priceRange === "high" && item.price_in_tk > 3000);

      return matchFabric && matchColor && matchDiscount && matchPrice;
    });
  };

  const filteredData = applyFilters();

  const clearFilters = () =>
    setFilters({ fabric: "All", color: "All", discount: false, priceRange: "All" });

  return (
    <div className={`${isLight ? "bg-gray-50" : "bg-gray-900"} container mx-auto py-10`}>
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h1 className={`${isLight ? "text-gray-800" : "text-gray-100"} text-4xl font-extrabold tracking-wide`}>
          Women’s Collection
        </h1>
        <p className={`${isLight ? "text-gray-600" : "text-gray-300"} text-lg mt-2`}>
          Discover the perfect outfit from our premium selection of fabrics, colors, and styles.
        </p>
        <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Filter Panel */}
      <div className={`${isLight ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"} border shadow-md rounded-2xl p-6 mb-10 max-w-4xl mx-auto`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Fabric Filter */}
          <div className="flex flex-col">
            <label className={`${isLight ? "text-gray-600" : "text-gray-200"} text-sm font-semibold mb-1`}>Fabric</label>
            <select
              value={filters.fabric}
              onChange={(e) => setFilters((prev) => ({ ...prev, fabric: e.target.value }))}
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="All">All Fabrics</option>
              <option value="Cotton Lawn">Cotton Lawn</option>
              <option value="Khadi Cotton">Khadi Cotton</option>
              <option value="Lawn">Lawn</option>
              <option value="Silk Blend">Silk Blend</option>
              <option value="Viscose">Viscose</option>
            </select>
          </div>

          {/* Color Filter */}
          <div className="flex flex-col">
            <label className={`${isLight ? "text-gray-600" : "text-gray-200"} text-sm font-semibold mb-1`}>Color</label>
            <select
              value={filters.color}
              onChange={(e) => setFilters((prev) => ({ ...prev, color: e.target.value }))}
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="All">All Colors</option>
              <option value="Red">Red</option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="White">White</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col">
            <label className={`${isLight ? "text-gray-600" : "text-gray-200"} text-sm font-semibold mb-1`}>Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: e.target.value }))}
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="All">All Prices</option>
              <option value="low">Below 1500৳</option>
              <option value="mid">1500৳ - 3000৳</option>
              <option value="high">Above 3000৳</option>
            </select>
          </div>

          {/* Discount Checkbox + Clear Button */}
          <div className="flex flex-col justify-center gap-3">
            <label className={`flex items-center gap-2 text-sm font-semibold ${isLight ? "text-gray-600" : "text-gray-200"}`}>
              <input
                type="checkbox"
                checked={filters.discount}
                onChange={(e) => setFilters((prev) => ({ ...prev, discount: e.target.checked }))}
                className="w-4 h-4 accent-amber-500"
              />
              Discount Only
            </label>

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow hover:bg-amber-600 transition-all duration-300"
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
              <div className={`${isLight ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"} single-card w-[300px] h-[450px] relative flex flex-col border rounded-lg shadow-lg hover:shadow-2xl transition hover:scale-[1.02]`}>
                {item.discount && (
                  <div className="px-3 py-1 text-sm font-medium top-2 right-2 rounded-md bg-red-500 text-white absolute shadow">
                    {Math.round(((item.price_in_tk - item.discount_price) / item.price_in_tk) * 100)}% OFF
                  </div>
                )}

                <div className="card_image w-full h-[240px] overflow-hidden rounded-t-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="max-h-[240px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h2 className={`${isLight ? "text-gray-800" : "text-gray-100"} text-lg font-semibold`}>
                    {item.product_name}
                  </h2>

                  <div className="mt-2">
                    {item.discount ? (
                      <>
                        <span className="text-gray-400 line-through text-sm">{item.price_in_tk}৳</span>
                        <span className="text-amber-600 font-bold text-lg ml-2">{item.discount_price}৳</span>
                      </>
                    ) : (
                      <span className={`${isLight ? "text-gray-800" : "text-gray-100"} font-bold text-lg`}>{item.price_in_tk}৳</span>
                    )}
                  </div>

                  <ul className="list-disc list-inside mt-2 text-sm text-blue-900">
                    <li>Brand: <span className="text-amber-600">{item.brand}</span></li>
                    <li>Fabric: <span className="text-amber-600">{item.fabric}</span></li>
                    <li>Set Type: <span className="text-amber-600">{item.set_type}</span></li>
                    <li>Color: <span className="text-amber-600">{item.color}</span></li>
                  </ul>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={`${isLight ? "text-gray-500" : "text-gray-300"} text-lg`}>No products match the filter.</p>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
