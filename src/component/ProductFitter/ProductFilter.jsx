import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import bdData from "../../DB/Db";
import { useThemeContext } from "../../context/ThemeProvider";

const ProductFilter = () => {
  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const [filters, setFilters] = useState({
    fabric: "All",
    color: "All",
    discount: false,
    priceRange: "All",
  });

  // ✅ Memoize filtered data for performance
  const filteredData = useMemo(() => {
    return bdData.filter(item => {
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
  }, [filters]);

  const clearFilters = () =>
    setFilters({ fabric: "All", color: "All", discount: false, priceRange: "All" });

  const textColor = isLight ? "text-gray-700" : "text-gray-200";
  const cardBg = isLight ? "bg-white" : "bg-gray-800";
  const cardText = isLight ? "text-gray-700" : "text-gray-100";
  const priceText = isLight ? "text-gray-800" : "text-gray-100";
  const badgeBg = "bg-red-500";

  return (
    <div className={`${isLight ? "bg-gray-50" : "bg-gray-900"} py-10`}>
      {/* Section Heading */}
      <div className="text-center mb-6 px-4 sm:px-6">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide uppercase ${cardText}`}>
          Women’s Collection
        </h1>
        <p className={`text-sm sm:text-base md:text-lg mt-2 ${textColor}`}>
          Discover the perfect outfit from our premium selection of fabrics, colors, and styles.
        </p>
        <div className="w-20 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Filter Panel */}
      <div className={`${cardBg} border shadow-md rounded-2xl p-4 sm:p-6 mb-8 max-w-4xl mx-auto`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {["Fabric", "Color", "Price Range"].map((filterType, i) => {
            const options =
              filterType === "Fabric"
                ? ["All", "Cotton Lawn", "Khadi Cotton", "Lawn", "Silk Blend", "Viscose"]
                : filterType === "Color"
                ? ["All", "Red", "Black", "Blue", "Green", "White"]
                : ["All", "low", "mid", "high"];
            const valueKey =
              filterType === "Fabric" ? "fabric" : filterType === "Color" ? "color" : "priceRange";

            return (
              <div key={i} className="flex flex-col">
                <label className={`text-sm font-semibold mb-1 ${textColor}`}>{filterType}</label>
                <select
                  value={filters[valueKey]}
                  onChange={(e) => setFilters(prev => ({ ...prev, [valueKey]: e.target.value }))}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-sm sm:text-base"
                >
                  {options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {filterType === "Price Range"
                        ? opt === "low"
                          ? "Below 1500৳"
                          : opt === "mid"
                          ? "1500৳ - 3000৳"
                          : opt === "high"
                          ? "Above 3000৳"
                          : "All Prices"
                        : opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}

          {/* Discount + Clear */}
          <div className="flex flex-col justify-center gap-2">
            <label className={`flex items-center gap-2 text-sm sm:text-base font-semibold ${textColor}`}>
              <input
                type="checkbox"
                checked={filters.discount}
                onChange={(e) => setFilters(prev => ({ ...prev, discount: e.target.checked }))}
                className="w-4 h-4 accent-red-500"
              />
              Discount Only
            </label>
            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-red-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow hover:bg-red-600 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-2 sm:px-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Link key={item.sku} to={`/product/${item.sku}`} className="w-[280px] sm:w-[300px] md:w-[320px]">
              <div className={`${cardBg} flex flex-col border rounded-lg shadow-lg hover:shadow-2xl transition hover:scale-[1.02]`}>
                {item.discount && (
                  <div className={`px-2 py-1 text-xs sm:text-sm font-medium top-2 right-2 rounded-md ${badgeBg} text-white absolute shadow`}>
                    {Math.round(((item.price_in_tk - item.discount_price) / item.price_in_tk) * 100)}% OFF
                  </div>
                )}
                <div className="w-full h-[200px] sm:h-[240px] overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    loading="lazy" // ✅ Lazy load images
                    className="max-h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                  <h2 className={`text-sm sm:text-base md:text-lg font-semibold ${cardText}`}>{item.product_name}</h2>
                  <div className="mt-1 sm:mt-2 flex items-center gap-2">
                    {item.discount ? (
                      <>
                        <span className="line-through text-gray-400 text-xs sm:text-sm">{item.price_in_tk}৳</span>
                        <span className={`ml-1 sm:ml-2 font-bold text-sm sm:text-base ${priceText}`}>{item.discount_price}৳</span>
                      </>
                    ) : (
                      <span className={`font-bold text-sm sm:text-base ${priceText}`}>{item.price_in_tk}৳</span>
                    )}
                  </div>
                  <ul className={`list-disc list-inside mt-1 text-xs sm:text-sm ${cardText}`}>
                    <li>Brand: <span className="text-red-500">{item.brand}</span></li>
                    <li>Fabric: <span className="text-red-500">{item.fabric}</span></li>
                    <li>Type: <span className="text-red-500">{item.set_type}</span></li>
                    <li>Color: <span className="text-red-500">{item.color}</span></li>
                  </ul>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={`${textColor} text-sm sm:text-base md:text-lg`}>No products match the filter.</p>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
