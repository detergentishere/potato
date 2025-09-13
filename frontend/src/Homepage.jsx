import React from "react";
import { motion } from "framer-motion";

function Homepage() {
  return (
    <div
      className="min-h-screen bg-black relative font-body"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1602222886008-3c6c55de6cf7?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay for luxury tint */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Floating Potato Illustration */}
        <motion.div
          className="flex justify-center animate-float"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4C77C]/30 blur-3xl rounded-full"></div>
            <img
              src="https://pngimg.com/d/potato_PNG7086.png"
              alt="Potato"
              className="relative w-full max-w-md mx-auto drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-[Bebas_Neue] font-black text-[#D4C77C] mb-6 leading-tight drop-shadow-xl">
            Welcome to <span className="text-[#A8743B]">Potato Hub</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-lg font-body">
            Discover, learn, and explore everything about potatoes — from detection to crop health and market prices, all in one elegant platform.
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-20px);} }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Homepage;
