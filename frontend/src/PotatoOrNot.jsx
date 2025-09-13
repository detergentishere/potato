import React, { useState } from "react";
import { motion } from "framer-motion";

const PotatoOrNot = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult("Analyzing... 🔬");

    setTimeout(() => {
      const predictions = ["Potato 🥔", "Not a Potato ❌"];
      setResult(predictions[Math.floor(Math.random() * predictions.length)]);
    }, 2000);
  };

  const getResultColor = () => {
    if (result.includes("❌")) return "#FF4D4F";
    if (result.includes("🥔")) return "#E6C067";
    return "#ffffff";
  };

  const getResultBg = () => {
    if (result.includes("❌")) return "rgba(30, 0, 0, 0.7)";
    if (result.includes("🥔")) return "rgba(40, 30, 10, 0.7)";
    return "rgba(40, 40, 40, 0.7)";
  };

  return (
    <div className="min-h-[90vh] relative font-body bg-black text-white flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1602222886008-3c6c55de6cf7?auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Panel (Text + Upload) */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading text-[#E6C067] drop-shadow-xl">
            Potato Or Not?
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            Upload an image and let our AI decide with golden precision.
          </p>

          <div className="bg-gradient-to-br from-[#1A1A1A]/90 to-[#2A2A2A]/90 backdrop-blur-md shadow-[0_0_25px_rgba(230,192,103,0.3)] rounded-2xl p-5 flex flex-col items-center gap-4 border border-[#E6C067]/40 w-full max-w-md">
            {/* Smaller Upload Button */}
            <label className="px-4 py-2 rounded-lg bg-[#2C2C2C] border border-[#E6C067]/60 text-[#E6C067] cursor-pointer hover:bg-[#3a3a3a] transition text-sm shadow-md">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>

            {image && (
              <motion.img
                src={image}
                alt="Uploaded"
                className="w-full max-w-sm rounded-2xl shadow-xl border border-[#E6C067]/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}

            {result && (
              <motion.div
                className="rounded-xl px-6 py-3 w-full text-center font-body font-semibold text-lg shadow-inner"
                style={{ backgroundColor: getResultBg(), color: getResultColor() }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {result}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right Side Potato */}
        <motion.div
          className="flex justify-center md:justify-end animate-float"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-800/30 via-yellow-500/20 to-yellow-700/30 blur-3xl rounded-full"></div>
            <img
              src="https://pngimg.com/d/potato_PNG7082.png"
              alt="Potato"
              className="relative w-full max-w-sm drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float { 
          0%,100%{transform:translateY(0);} 
          50%{transform:translateY(-15px);} 
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default PotatoOrNot;
