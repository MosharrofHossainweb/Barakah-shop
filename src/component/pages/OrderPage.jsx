import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeProvider";
import Navber from "../Navber/Navber";

const OrderPage = () => {
  const { mode } = useThemeContext();
  const isLight = mode === "light";
  const location = useLocation();
  const navigate = useNavigate();

  const { product, size, color: initialColor, quantity } = location.state || {};
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState(quantity || 1);
  const [color, setColor] = useState(initialColor || "");

  // 🟢 Load saved data from localStorage (auto-fill)
  useEffect(() => {
    const savedName = localStorage.getItem("customer_name");
    const savedPhone = localStorage.getItem("customer_phone");
    const savedAddress = localStorage.getItem("customer_address");
    if (savedName) setName(savedName);
    if (savedPhone) setPhone(savedPhone);
    if (savedAddress) setAddress(savedAddress);
  }, []);

  if (!product)
    return (
      <p
        className={`${isLight ? "text-gray-800" : "text-gray-100"} text-center mt-10`}
      >
        কোনো প্রোডাক্ট সিলেক্ট করা হয়নি।
      </p>
    );

  // 🟢 WhatsApp message
  const message = `🛒 *New Order* 🛒

👤 Name: ${name || "Not provided"}
📞 Phone: ${phone || "Not provided"}
🏠 Address: ${address || "Not provided"}
📦 Product: ${product.product_name}
🆔 Code: ${product.sku}
📏 Size: ${size || "N/A"}
🎨 Color: ${color || "N/A"}
🔢 Quantity: ${qty}
💰 Total: ${
    product.discount
      ? product.discount_price * qty
      : product.price_in_tk * qty
  }৳`;

  const handleWhatsApp = () => {
    if (!name || !phone || !address) {
      alert("অনুগ্রহ করে সব তথ্য পূরণ করুন।");
      return;
    }
    if (!color) {
      alert("অনুগ্রহ করে কালার সিলেক্ট করুন।");
      return;
    }

    // 🟢 Save data to localStorage (auto-fill for next order)
    localStorage.setItem("customer_name", name);
    localStorage.setItem("customer_phone", phone);
    localStorage.setItem("customer_address", address);

    const url = `https://wa.me/8801617555633?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Navber />
      <div className={`${isLight ? "bg-gray-100" : "bg-gray-900"} min-h-screen`}>
        <div className="container mx-auto px-5 md:px-0 py-10">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
              আপনার অর্ডার কনফার্ম করুন
            </h1>

            {/* Product Summary */}
            <div className="flex flex-col md:flex-row gap-5 items-center border-b pb-5 mb-6">
              <img
                src={product.image}
                alt={product.product_name}
                className="w-28 h-28 object-cover rounded-lg shadow-md"
              />
              <div className="flex flex-col gap-2 text-gray-800 dark:text-gray-100">
                <h2 className="text-lg font-semibold">{product.product_name}</h2>
                <p><span className="font-medium">কোড:</span> {product.sku}</p>
                <p><span className="font-medium">সাইজ:</span> {size || "N/A"}</p>
                <p><span className="font-medium">কালার:</span> {color || "N/A"}</p>
                <p>
                  <span className="font-medium">দাম:</span>{" "}
                  {product.discount ? product.discount_price : product.price_in_tk}৳
                </p>
              </div>
            </div>

            {/* Order Form */}
            <div className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="tel"
                placeholder="ফোন নম্বর"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100"
              />
              <textarea
                placeholder="ডেলিভারি ঠিকানা"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100"
              ></textarea>

              {/* Color Selection */}
              {product.color && (
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="border rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="">কালার নির্বাচন করুন</option>
                  {product.color.split(",").map((c) => (
                    <option key={c} value={c.trim()}>
                      {c.trim()}
                    </option>
                  ))}
                </select>
              )}

              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100"
              />

              {/* Live Preview */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border">
                <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                  ℹ️ উপরের তথ্যগুলো সঠিক কিনা যাচাই করুন। এই মেসেজটি WhatsApp-এ পাঠালে
                  আপনার অর্ডার কনফার্ম হবে ✅
                </p>
                <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-100">
                  {message}
                </pre>
              </div>

              {/* Buttons */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                WhatsApp এ অর্ডার পাঠান
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full py-3 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                শপিং চালিয়ে যান
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
