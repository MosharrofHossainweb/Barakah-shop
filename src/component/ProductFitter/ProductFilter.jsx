import React, { useState } from 'react';
import bdData from '../../DB/Db';

const ProductFilter = () => {
  const [filteredData, setFilteredData] = useState(bdData);

  const handleFilter = (fabric) => {
    if (fabric === 'All') {
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
        {['All', 'Cotton', 'Khadi Cotton', 'Lawn', 'Silk Blend', 'Viscose'].map((fabric) => (
          <button
            key={fabric}
            onClick={() => handleFilter(fabric)}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-full active:scale-[1.1] hover:bg-gray-400 transition"
          >
            {fabric}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="single-card w-[400px] relative flex gap-3 overflow-hidden h-[500px] border rounded-lg shadow-lg hover:shadow-2xl transition"
          >
            {item.sale && (
              <div className="px-3 py-1 text-sm font-normal top-0 right-1 rounded-sm bg-red-500 text-white absolute mt-1">
                Sale
              </div>
            )}

            <div className="card_image w-[220px] h-full overflow-hidden bg-gray-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="single_card_text w-[180px]">
              <h2 className="text-lg font-semibold mt-4">{item.name}</h2>
              <p className="text-sm font-normal text-gray-600">{item.description}</p>
              <h2 className="text-lg font-semibold text-gray-600 mt-4">
                Price: {item.price}tk{' '}
                {item.salePrice && <span className="text-amber-400">{item.salePrice}tk</span>}
              </h2>
              <ul className="list-disc p-3">
                <li className="text-blue-900 text-sm font-medium">
                  Brand: <span className="text-amber-600">{item.brand}</span>
                </li>
                <li className="text-blue-900 text-sm font-medium">
                  Fabric: <span className="text-amber-600">{item.fabric}</span>
                </li>
                <li className="text-blue-900 text-sm font-medium">
                  Set Type: <span className="text-amber-600">{item.setType}</span>
                </li>
                <li className="text-blue-900 text-sm font-medium">
                  Color: <span className="text-amber-600">{item.color}</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
