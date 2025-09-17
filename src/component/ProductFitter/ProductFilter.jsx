import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import bdData from "../../DB/Db";

const ProductFilter = () => {
  const [filteredData, setFilteredData] = useState(bdData);

  const handleFilter = (fabric) => {
    if (fabric === "All") {
      setFilteredData(bdData);
    } else {
      const filterData = bdData.filter((item) => item.fabric === fabric);
      setFilteredData(filterData);
    }
  };

  return (
    <div className="container mx-auto py-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["All", "Cotton Lawn", "Khadi Cotton", "Lawn", "Silk Blend", "Viscose"].map(
          (fabric) => (
            <button
              key={fabric}
              onClick={() => handleFilter(fabric)}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-full active:scale-[1.1] hover:bg-gray-400 transition"
            >
              {fabric}
            </button>
          )
        )}
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredData.map((item, index) => (
          <Link key={index} to={`/product/${item.sku}`}> {/* ✅ Link to Product Details */}
            <div className="single-card w-[300px] h-[450px] relative flex flex-col border rounded-lg shadow-lg hover:shadow-2xl transition hover:scale-[1.02]">
              {/* Discount Badge */}
              {item.discount && (
                <div className="px-3 py-1 text-sm font-medium top-2 right-2 rounded-md bg-red-500 text-white absolute shadow">
                  {Math.round(
                    ((item.price_in_tk - item.discount_price) / item.price_in_tk) * 100
                  )}
                  % OFF
                </div>
              )}

              {/* Product Image */}
              <div className="card_image w-full h-[240px] overflow-hidden bg-gray-100 rounded-t-lg flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.product_name}
                  className="max-h-[240px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-semibold">{item.product_name}</h2>

                {/* Price Section */}
                <div className="mt-2">
                  {item.discount ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">
                        {item.price_in_tk}৳
                      </span>
                      <span className="text-amber-600 font-bold text-lg ml-2">
                        {item.discount_price}৳
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-800 font-bold text-lg">
                      {item.price_in_tk}৳
                    </span>
                  )}
                </div>

                {/* Extra Info */}
                <ul className="list-disc list-inside mt-2 text-sm text-blue-900">
                  <li>
                    Brand: <span className="text-amber-600">{item.brand}</span>
                  </li>
                  <li>
                    Fabric: <span className="text-amber-600">{item.fabric}</span>
                  </li>
                  <li>
                    Set Type: <span className="text-amber-600">{item.set_type}</span>
                  </li>
                  <li>
                    Color: <span className="text-amber-600">{item.color}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
