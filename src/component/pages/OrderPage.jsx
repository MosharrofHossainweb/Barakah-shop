import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeProvider";
import Navber from "../Navber/Navber";

const OrderPage = () => {
  const { mode } = useThemeContext();
  const isLight = mode === "light";
  const location = useLocation();
  const navigate = useNavigate();

  const { product, size, color: initialColor, quantity, address: passedAddress } =
    location.state || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(passedAddress || "");
  const [qty, setQty] = useState(quantity || 1);
  const [color, setColor] = useState(initialColor || "");
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  // Load saved data
  useEffect(() => {
    const savedName = localStorage.getItem("customer_name");
    const savedPhone = localStorage.getItem("customer_phone");
    const savedAddress = localStorage.getItem("customer_address");

    if (savedName) setName(savedName);
    if (savedPhone) setPhone(savedPhone);
    if (!address && savedAddress) setAddress(savedAddress);
  }, []);

  // Detect Dhaka / Outside Dhaka
  useEffect(() => {
    if (address) {
      const isDhaka =
        address.toLowerCase().includes("dhaka") ||
        address.toLowerCase().includes("ঢাকা");
      setDeliveryCharge(isDhaka ? 60 : 110);
    } else {
      setDeliveryCharge(0);
    }
  }, [address]);

  if (!product)
    return (
      <p
        className={`${isLight ? "text-gray-800" : "text-gray-100"} text-center mt-10`}
      >
        কোনো প্রোডাক্ট সিলেক্ট করা হয়নি।
      </p>
    );

  const basePrice = product.discount ? product.discount_price : product.price_in_tk;
  const subtotal = basePrice * qty;
  const total = subtotal + deliveryCharge;

  const message = `🛒 *New Order* 🛒

👤 Name: ${name || "Not provided"}
📞 Phone: ${phone || "Not provided"}
🏠 Address: ${address || "Not provided"}

📦 Product: ${product.product_name}
🆔 Code: ${product.sku}
📏 Size: ${size || "N/A"}
🎨 Color: ${color || "N/A"}
🔢 Quantity: ${qty}

💸 Subtotal: ${subtotal}৳
🚚 Delivery Charge: ${deliveryCharge}৳
💰 Total: ${total}৳`;

  const handleWhatsApp = () => {
    if (!name || !phone || !address) {
      alert("⚠️ অনুগ্রহ করে নাম, ফোন ও ঠিকানা পূরণ করুন।");
      return;
    }
    if (!color) {
      alert("🎨 অনুগ্রহ করে কালার সিলেক্ট করুন।");
      return;
    }

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
                  <span className="font-medium">দাম:</span> {basePrice}৳
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

              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100"
              />

              <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-lg border">
                <p className="text-gray-800 dark:text-gray-100 font-medium">
                  🟢 আগাম কোনো টাকা দিতে হবে না। পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করতে পারবেন।
                </p>
                <p className="text-gray-800 dark:text-gray-100 mt-1">
                  🚚 ঢাকার ভিতরে ডেলিভারি চার্জ: <span className="font-semibold">৬০৳</span> |
                  ঢাকার বাইরে: <span className="font-semibold">১১০৳</span>
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border">
                <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                  ℹ️ উপরের তথ্যগুলো সঠিক কিনা যাচাই করুন। নিচের মেসেজটি WhatsApp-এ পাঠালে আপনার অর্ডার কনফার্ম হবে ✅
                </p>
                <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-100">
                  {message}
                </pre>
              </div>

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
