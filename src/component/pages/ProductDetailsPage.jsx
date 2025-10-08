import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import menData from "../../DB/MenDb";
import bdData from "../../DB/Db";
import { useThemeContext } from "../../context/ThemeProvider";
import Navber from "../Navber/Navber";

const ProductDetailsPage = () => {
  const { mode } = useThemeContext();
  const isLight = mode === "light";
  const { id } = useParams();
  const navigate = useNavigate();

  const product =
    menData.find((p) => p.sku === id) || bdData.find((p) => p.sku === id);

  const productImages = [
    product?.image,
    product?.image2,
    product?.image3,
    product?.image4,
    product?.image5,
  ].filter(Boolean);

  const [mainImage, setMainImage] = useState(productImages[0]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  useEffect(() => {
    if (location.toLowerCase().includes("dhaka")) {
      setDeliveryCharge(60);
    } else if (location.trim() !== "") {
      setDeliveryCharge(110);
    } else {
      setDeliveryCharge(0);
    }
  }, [location]);

  if (!product)
    return (
      <p
        className={`${
          isLight ? "text-gray-800" : "text-gray-100"
        } text-center mt-10`}
      >
        Product not found
      </p>
    );

  const youtubeEmbedUrl = product.video
    ? `${product.video}?autoplay=1`
    : "https://www.youtube.com/embed/KdxvBcuUumw?autoplay=1";

  // ✅ Custom professional alert
  const showAlert = (message) => {
    const alertBox = document.createElement("div");
    alertBox.innerHTML = `
      <div style="
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        color: #333;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        text-align: center;
        font-family: sans-serif;
      ">
        <h3 style="margin-bottom: 10px; color: #d97706;">⚠️ রঙ নির্বাচন করুন!</h3>
        <p style="font-size: 14px; color: #555;">
          ${message}
        </p>
        <button id="closeAlert" style="
          margin-top: 15px;
          background: #d97706;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        ">ঠিক আছে</button>
      </div>
    `;
    document.body.appendChild(alertBox);
    document.getElementById("closeAlert").onclick = () => alertBox.remove();
  };

  // ✅ Modified handleBuyNow
  const handleBuyNow = () => {
    if (!color) {
      showAlert("অনুগ্রহ করে একটি কালার সিলেক্ট করুন, তারপর “Buy Now” চাপুন।");
      return;
    }
    navigate("/order", { state: { product, color, quantity, location, deliveryCharge } });
  };

  return (
    <>
      <Navber />
      <div
        className={`${
          isLight ? "bg-gray-100" : "bg-gray-900"
        } min-h-screen text-gray-800 dark:text-gray-100`}
      >
        <div className="container mx-auto px-5 md:px-0 flex flex-col lg:flex-row gap-10 py-10">
          {/* Left: Images + Video */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg h-[450px] md:h-[500px]">
              <img
                src={mainImage}
                alt={product.product_name}
                className="max-h-full w-auto object-contain rounded-lg"
              />
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {productImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer flex-shrink-0 border-2 ${
                      mainImage === img
                        ? "border-blue-600"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}

            {product.video && (
              <div
                className="relative cursor-pointer mt-6 w-full h-[300px] md:h-[360px] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center"
                onClick={() => setIsVideoPlaying(true)}
              >
                {!isVideoPlaying ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${
                        product.video.split("/embed/")[1]
                      }/hqdefault.jpg`}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.752 11.168l-6.586-3.792A1 1 0 007 8.108v7.784a1 1 0 001.166.972l6.586-1.2a1 1 0 00.752-.972v-3.404a1 1 0 00-.752-.972z"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src={youtubeEmbedUrl}
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                )}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.product_name}</h1>

            <div className="space-y-1 text-base">
              <p>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Brand:
                </span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {product.brand}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Fabric:
                </span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {product.fabric}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Type:
                </span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {product.set_type}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Color:
                </span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {product.color}
                </span>
              </p>
            </div>

            <div className="mt-3">
              {product.discount ? (
                <>
                  <span className="line-through text-gray-400">
                    {product.price_in_tk}৳
                  </span>
                  <span className="ml-2 text-2xl font-bold text-amber-600">
                    {product.discount_price}৳
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-amber-600">
                  {product.price_in_tk}৳
                </span>
              )}
            </div>

            {/* ✅ Description fixed */}
            <div className="mt-5 p-5 rounded-lg shadow-md border bg-white dark:bg-gray-800">
              <h2 className="text-lg font-semibold mb-3 text-amber-600 flex items-center gap-2">
                📝 প্রোডাক্ট বিবরণ
              </h2>

              {product.description && product.description.trim() !== "" ? (
                <p className="leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {product.description}
                </p>
              ) : (
                <div
                  className="p-4 rounded-lg border-l-4 bg-amber-50 border-amber-500 text-amber-800"
                  role="alert"
                >
                  <strong className="font-medium">বিবরণ অনুপস্থিত!</strong>
                  <p className="mt-1 text-sm">
                    এই প্রোডাক্টের বিস্তারিত বিবরণ বর্তমানে পাওয়া যায়নি।
                  </p>
                </div>
              )}
            </div>

            {/* Delivery Info Section */}
            <div
              className={`mt-6 p-5 rounded-lg shadow-md border ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-gray-800 border-gray-700"
              }`}
            >
              <p className="text-lg font-semibold text-green-600">
                💸 অগ্রিম কোনো টাকা দিতে হবে না।
              </p>
              <p className="text-base mt-1 text-gray-700 dark:text-gray-300">
                পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করতে পারবেন।
              </p>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-amber-600">
                  🚚 ডেলিভারি চার্জ:
                </span>{" "}
                ঢাকার ভিতরে{" "}
                <span className="font-semibold text-green-600">৬০৳</span> এবং ঢাকার বাইরে{" "}
                <span className="font-semibold text-green-600">১১০৳</span>।
              </div>
            </div>

            {/* Address Input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="আপনার ঠিকানা লিখুন"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full dark:bg-gray-700 dark:text-gray-100"
              />
              {deliveryCharge > 0 && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  ডেলিভারি চার্জ:{" "}
                  <span className="font-semibold text-green-600">
                    {deliveryCharge}৳
                  </span>
                </p>
              )}
            </div>

            {/* Color, Quantity */}
            <div className="mt-4 flex gap-4">
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-100 w-1/2"
              >
                <option value="">Select Color</option>
                {product.color?.split(",").map((c) => (
                  <option key={c} value={c.trim()}>
                    {c.trim()}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-100 w-1/2"
                placeholder="Quantity"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={handleBuyNow}
                className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition"
              >
                Buy Now
              </button>

              <a
                href={`https://wa.me/8801617555633?text=${encodeURIComponent(
                  `👤 Name: \n📞 Phone: \n🏠 Address: ${location}\n📦 Product: ${product.product_name}\n🆔 Code: ${product.sku}\n🎨 Color: ${
                    color || "N/A"
                  }\n🔢 Quantity: ${quantity}\n💰 Delivery Charge: ${deliveryCharge}৳`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
