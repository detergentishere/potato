import React, { useState } from "react";
import { motion } from "framer-motion";

const DiseaseDetector = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult("Analyzing... 🔬");

    // Placeholder ML prediction
    setTimeout(() => {
      const diseases = [
        "Healthy 🥔",
        "Blight Detected ⚠️",
        "Early Blight ⚠️",
        "Late Blight ⚠️",
        "Unknown Issue ❌",
      ];
      const randomResult = diseases[Math.floor(Math.random() * diseases.length)];
      setResult(randomResult);
    }, 2000);
  };

  const getResultColor = () => {
    if (result.includes("⚠️")) return "#E6C067";
    if (result.includes("❌")) return "#FF4D4F";
    if (result.includes("🥔")) return "#34D399";
    return "#ffffff";
  };

  const getResultBg = () => {
    if (result.includes("⚠️")) return "rgba(60, 50, 20, 0.6)";
    if (result.includes("❌")) return "rgba(50, 10, 10, 0.6)";
    if (result.includes("🥔")) return "rgba(10, 40, 30, 0.6)";
    return "rgba(40, 40, 40, 0.6)";
  };

  return (
    <div className="min-h-screen bg-black relative font-serif text-white flex items-center justify-center px-6 py-16">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1602222886008-3c6c55de6cf7?auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Floating Potato */}
        <motion.div
          className="flex justify-center md:justify-start animate-float"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-800/30 via-yellow-500/20 to-yellow-700/30 blur-3xl rounded-full"></div>
            <img
  src="https://pngimg.com/d/potato_PNG7085.png"
  alt="Potatoes"
  className="w-72 md:w-96 drop-shadow-2xl animate-float"
/>

          </div>
        </motion.div>

        {/* Right: Detector */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#E6C067] drop-shadow-lg">
            Disease Detector
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Upload an image of your potato crop, and let our AI check for
            diseases with golden precision.
          </p>

          {/* Upload Card */}
          <div className="bg-gradient-to-br from-[#1A1A1A]/90 to-[#2A2A2A]/90 backdrop-blur-md shadow-[0_0_30px_rgba(230,192,103,0.3)] rounded-3xl p-6 flex flex-col items-center gap-4 border border-[#E6C067]/40">
            <label className="px-4 py-2 rounded-lg bg-[#2C2C2C] border border-[#E6C067]/60 text-[#E6C067] cursor-pointer hover:bg-[#3a3a3a] transition text-sm shadow-md">
              Upload Image
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
                className="w-full max-w-md rounded-2xl shadow-xl border border-[#E6C067]/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}

            {result && (
              <motion.div
                className="rounded-xl px-6 py-3 w-full text-center font-serif font-semibold text-lg shadow-inner"
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
      </div>

      <style>{`
        @keyframes float { 
          0%,100%{transform:translateY(0);} 
          50%{transform:translateY(-20px);} 
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default DiseaseDetector;
