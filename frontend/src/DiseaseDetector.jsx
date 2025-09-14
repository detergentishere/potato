import React, { useState } from "react";
import { motion } from "framer-motion";

const DiseaseDetector = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult("");
    setLoading(true);

    // send image to backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      console.error(err);
      setResult("❌ Error: Could not analyze image");
    } finally {
      setLoading(false);
    }
  };

  const getResultColor = () => {
    if (result.includes("Blight")) return "#E6C067";
    if (result.includes("❌")) return "#FF4D4F";
    if (result.includes("Healthy")) return "#34D399";
    return "#ffffff";
  };

  const getResultBg = () => {
    if (result.includes("Blight")) return "rgba(60, 50, 20, 0.6)";
    if (result.includes("❌")) return "rgba(50, 10, 10, 0.6)";
    if (result.includes("Healthy")) return "rgba(10, 40, 30, 0.6)";
    return "rgba(40, 40, 40, 0.6)";
  };

  return (
    <div className="min-h-screen bg-black relative font-sans text-white flex justify-center px-6 pt-24 pb-8">
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
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Potato */}
        <motion.div
          className="flex justify-center md:justify-start animate-float items-center h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-800/30 via-yellow-500/20 to-yellow-700/30 blur-2xl rounded-full"></div>
            <img
              src="https://pngimg.com/d/potato_PNG7085.png"
              alt="Potatoes"
              className="w-52 md:w-64 drop-shadow-2xl animate-float"
            />
          </div>
        </motion.div>

        {/* Right: Detector */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#E6C067] drop-shadow-lg">
            Disease Detector
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            Upload an image of your potato crop and let our AI detect diseases
            with precision.
          </p>

          {/* Upload Card */}
          <div className="bg-gradient-to-br from-[#1A1A1A]/90 to-[#2A2A2A]/90 backdrop-blur-md shadow-[0_0_25px_rgba(230,192,103,0.3)] rounded-2xl p-4 flex flex-col items-center gap-3 border border-[#E6C067]/40 w-full max-w-md">
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
                className="w-full max-w-xs rounded-2xl shadow-xl border border-[#E6C067]/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}

            {loading && (
              <motion.div
                className="rounded-xl px-4 py-2 w-full text-center font-sans font-semibold text-sm shadow-inner"
                style={{ backgroundColor: "rgba(40,40,40,0.6)", color: "#E6C067" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                Analyzing... 🔬
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                className="rounded-xl px-4 py-2 w-full text-center font-sans font-semibold text-sm shadow-inner"
                style={{ backgroundColor: getResultBg(), color: getResultColor() }}
                initial={{ opacity: 0, y: 10 }}
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
