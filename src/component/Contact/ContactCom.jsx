import React from "react";
import { useThemeContext } from "../../context/ThemeProvider";

const ContactCom = () => {
  const { mode } = useThemeContext();
  const textColor = mode === "light" ? "text-gray-700" : "text-gray-200";
  const bgColor = mode === "light" ? "bg-white" : "bg-gray-800";
  const inputBg = mode === "light" ? "bg-gray-100" : "bg-gray-700";

  return (
    <div className={`${mode === "dark" ? "bg-gray-900" : "bg-gray-100"} min-h-screen py-16`}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${textColor}`}>Contact Us</h1>
          <p className={`mt-2 ${textColor}`}>Reach out to Barakah Shop for any inquiries</p>
          <div className="w-24 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className={`${bgColor} p-8 rounded-2xl shadow-lg`}>
            <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>Barakah Shop</h2>

            {/* Emails */}
            <p className={`${textColor} mb-2`}>
              Email:{" "}
              <a href="mailto:mosharrofhossainpdl@gmail.com" className="text-blue-500">
                mosharrofhossainpdl@gmail.com
              </a>
            </p>
            <p className={`${textColor} mb-2`}>
              Email:{" "}
              <a href="mailto:mosharrofhossainmdl@gmail.com" className="text-blue-500">
                mosharrofhossainmdl@gmail.com
              </a>
            </p>

            {/* Phone & WhatsApp */}
            <p className={`${textColor} mb-2`}>
              WhatsApp / Phone:{" "}
              <a href="tel:+8801617555633" className="text-blue-500">
                +8801617555633
              </a>
            </p>
            <p className={`${textColor} mb-2`}>
              Phone:{" "}
              <a href="tel:+8801959495293" className="text-blue-500">
                +8801959495293
              </a>
            </p>

            {/* Social Links */}
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="https://www.facebook.com/share/19Na7me4gf/"
                target="_blank"
                className="text-blue-700 hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/mosharrof-hossain-927759199?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/channel/UC2bjumLky1meBtquEsAvRSA/about?disable_polymer=1"
                target="_blank"
                className="text-red-500 hover:underline"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${bgColor} p-8 rounded-2xl shadow-lg`}>
            <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>Send us a message</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`p-3 rounded-md ${inputBg} outline-none`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`p-3 rounded-md ${inputBg} outline-none`}
              />
              <input
                type="text"
                placeholder="Subject"
                className={`p-3 rounded-md ${inputBg} outline-none`}
              />
              <textarea
                placeholder="Message"
                rows="5"
                className={`p-3 rounded-md ${inputBg} outline-none`}
              ></textarea>
              <button
                type="submit"
                className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCom;
