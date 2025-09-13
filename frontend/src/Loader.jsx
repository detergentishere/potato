import React from "react";
import PotatoImg from "./assets/bota.png"; // Place your optimized PNG here

const Loader = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-black z-50">
    <div className="relative flex justify-center items-center">
      {/* Soft glowing light behind potato */}
      <div className="absolute w-56 h-56 rounded-full bg-yellow-300/30 blur-3xl"></div>
      
      {/* Potato itself */}
      <img
        src={PotatoImg}
        alt="Premium Potato"
        className="w-32 h-32 animate-zoom"
      />
    </div>

    {/* Animation */}
    <style>{`
      @keyframes zoom {
        0%,100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
      .animate-zoom { animation: zoom 1.8s ease-in-out infinite; }
    `}</style>
  </div>
);

export default Loader;
