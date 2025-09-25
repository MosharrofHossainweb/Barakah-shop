import React, { useState } from "react";
import { Link } from "react-router-dom";
import menData from "../../DB/MenDb";
import Navber from "../Navber/Navber";
import { useThemeContext } from "../../context/ThemeProvider";
import { IoClose, IoFilter } from "react-icons/io5";

const MenProductFilter = () => {
  const { mode } = useThemeContext();
  const [filters, setFilters] = useState({
    fabric: "All",
    color: "All",
    discount: false,
    priceRange: "All",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const applyFilters = () => {
    return menData.filter(item => {
      const matchFabric = filters.fabric === "All" || item.fabric === filters.fabric;
      const matchColor = filters.color === "All" || item.color === filters.color;
      const matchDiscount = !filters.discount || item.discount;
      const matchPrice =
        filters.priceRange === "All" ||
        (filters.priceRange === "low" && item.price_in_tk < 1500) ||
        (filters.priceRange === "mid" && item.price_in_tk >= 1500 && item.price_in_tk <= 3000) ||
        (filters.priceRange === "high" && item.price_in_tk > 3000);
      return matchFabric && matchColor && matchDiscount && matchPrice;
    });
  };

  const filteredData = applyFilters();
  const clearFilters = () =>
    setFilters({ fabric: "All", color: "All", discount: false, priceRange: "All" });

  const textColor = mode === "light" ? "text-gray-700" : "text-gray-200";
  const cardBg = mode === "light" ? "bg-white" : "bg-gray-800";
  const cardText = mode === "light" ? "text-gray-700" : "text-gray-100";
  const priceText = mode === "light" ? "text-gray-800" : "text-gray-100";
  const badgeBg = "bg-blue-700";

  return (
    <>
      <Navber />
      <div className={`${mode === "dark" ? "bg-gray-900" : "bg-gray-100"} container mx-auto py-10`}>
        {/* Section Heading */}
        <div className="text-center mb-6">
          <h1 className={`text-4xl font-extrabold tracking-wide uppercase ${mode === "light" ? "text-gray-800" : "text-gray-100"}`}>
            Men’s Panjabi Collection
          </h1>
          <p className={`text-lg mt-2 ${textColor}`}>
            Explore elegant Panjabis and traditional wear for every occasion.
          </p>
          <div className="w-28 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg"
          >
            <IoFilter size={20} />
            Filter
          </button>
        </div>

        {/* Filter Drawer for Mobile */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Filters</h2>
            <button onClick={() => setIsDrawerOpen(false)}>
              <IoClose size={24} className="text-gray-800 dark:text-gray-100" />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4">
            {/* Fabric */}
            <div className="flex flex-col">
              <label className={`text-sm font-semibold mb-1 ${textColor}`}>Fabric</label>
              <select
                value={filters.fabric}
                onChange={(e) => setFilters(prev => ({ ...prev, fabric: e.target.value }))}
                className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="All">All Fabrics</option>
                <option value="Cotton">Cotton</option>
                <option value="Linen">Linen</option>
                <option value="Khadi">Khadi</option>
                <option value="Silk Blend">Silk Blend</option>
                <option value="Viscose">Viscose</option>
              </select>
            </div>

            {/* Color */}
            <div className="flex flex-col">
              <label className={`text-sm font-semibold mb-1 ${textColor}`}>Color</label>
              <select
                value={filters.color}
                onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
                className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="All">All Colors</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Maroon">Maroon</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="flex flex-col">
              <label className={`text-sm font-semibold mb-1 ${textColor}`}>Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="All">All Prices</option>
                <option value="low">Below 1500৳</option>
                <option value="mid">1500৳ - 3000৳</option>
                <option value="high">Above 3000৳</option>
              </select>
            </div>

            {/* Discount */}
            <label className={`flex items-center gap-2 text-sm font-semibold ${textColor}`}>
              <input
                type="checkbox"
                checked={filters.discount}
                onChange={(e) => setFilters(prev => ({ ...prev, discount: e.target.checked }))}
                className="w-4 h-4 accent-blue-700"
              />
              Discount Only
            </label>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Overlay */}
        {isDrawerOpen && (
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          ></div>
        )}

        {/* Desktop Filter Panel */}
        <div className="hidden md:block mb-6">
          <div className={`${cardBg} border shadow-md rounded-2xl p-6 max-w-4xl mx-auto`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Fabric Filter */}
              <div className="flex flex-col">
                <label className={`text-sm font-semibold mb-1 ${textColor}`}>Fabric</label>
                <select
                  value={filters.fabric}
                  onChange={(e) => setFilters(prev => ({ ...prev, fabric: e.target.value }))}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="All">All Fabrics</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Linen">Linen</option>
                  <option value="Khadi">Khadi</option>
                  <option value="Silk Blend">Silk Blend</option>
                  <option value="Viscose">Viscose</option>
                </select>
              </div>

              {/* Color Filter */}
              <div className="flex flex-col">
                <label className={`text-sm font-semibold mb-1 ${textColor}`}>Color</label>
                <select
                  value={filters.color}
                  onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="All">All Colors</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Maroon">Maroon</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex flex-col">
                <label className={`text-sm font-semibold mb-1 ${textColor}`}>Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="All">All Prices</option>
                  <option value="low">Below 1500৳</option>
                  <option value="mid">1500৳ - 3000৳</option>
                  <option value="high">Above 3000৳</option>
                </select>
              </div>

              {/* Discount + Clear */}
              <div className="flex flex-col justify-center gap-3">
                <label className={`flex items-center gap-2 text-sm font-semibold ${textColor}`}>
                  <input
                    type="checkbox"
                    checked={filters.discount}
                    onChange={(e) => setFilters(prev => ({ ...prev, discount: e.target.checked }))}
                    className="w-4 h-4 accent-blue-700"
                  />
                  Discount Only
                </label>

                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Link key={index} to={`/product/${item.sku}`}>
                <div className={`${cardBg} w-[300px] h-[450px] relative flex flex-col border rounded-lg shadow-lg hover:shadow-2xl transition hover:scale-[1.02]`}>
                  {item.discount && (
                    <div className={`px-3 py-1 text-sm font-medium top-2 right-2 rounded-md ${badgeBg} text-white absolute shadow`}>
                      {Math.round(((item.price_in_tk - item.discount_price) / item.price_in_tk) * 100)}% OFF
                    </div>
                  )}
                  <div className="card_image w-full h-[240px] overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                    <img src={item.image} alt={item.product_name} className="max-h-[240px] w-auto object-contain transition-transform duration-300 hover:scale-105" />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h2 className={`text-lg font-semibold ${cardText}`}>{item.product_name}</h2>
                    <div className="mt-2">
                      {item.discount ? (
                        <>
                          <span className="line-through text-sm text-gray-400">{item.price_in_tk}৳</span>
                          <span className={`ml-2 font-bold text-lg ${priceText}`}>{item.discount_price}৳</span>
                        </>
                      ) : (
                        <span className={`font-bold text-lg ${priceText}`}>{item.price_in_tk}৳</span>
                      )}
                    </div>
                    <ul className={`list-disc list-inside mt-2 text-sm ${cardText}`}>
                      <li>Brand: <span className="text-blue-500">{item.brand}</span></li>
                      <li>Fabric: <span className="text-blue-500">{item.fabric}</span></li>
                      <li>Type: <span className="text-blue-500">{item.set_type}</span></li>
                      <li>Color: <span className="text-blue-500">{item.color}</span></li>
                    </ul>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className={`${textColor} text-lg`}>No products match the filter.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MenProductFilter;
