import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/movkyykj", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Formspree response:", data);

      if (response.ok) {
        setStatusMessage("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatusMessage("❌ Failed to send message. Try again later.");
      }

      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatusMessage("⚠️ Network error. Please check your connection.");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-start py-20 px-6 relative overflow-hidden">
      
      {/* ✅ Animated Status Message (Always visible) */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            key="statusMessage"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 z-50 bg-blue-600/90 px-6 py-3 rounded-lg shadow-lg text-white font-medium text-center"
          >
            {statusMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Form section */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-800/90 p-8 rounded-2xl shadow-lg w-full max-w-md mt-10"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Contact Me</h2>

        <label className="block mb-3">
          <span className="text-gray-300">Name</span>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-300">Email</span>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-300">Message</span>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-white"
        >
          Send Message
        </button>
      </motion.form>
    </div>
  );
};

export default ContactPage;
