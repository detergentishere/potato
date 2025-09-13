import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./components/ui/card";

function Dashboard() {
  const [location, setLocation] = useState("");
  const [prices, setPrices] = useState({
    normal: null,
    sweet: null,
    red: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchPrices = () => {
    if (!location) return;
    setLoading(true);
    setPrices({ normal: null, sweet: null, red: null });

    setTimeout(() => {
      setPrices({
        normal: `$${(Math.random() * 40 + 10).toFixed(2)}`,
        sweet: `$${(Math.random() * 60 + 20).toFixed(2)}`,
        red: `$${(Math.random() * 50 + 15).toFixed(2)}`,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6 py-12 bg-black"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Floating Potato */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center col-span-1"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full"></div>
            <img
              src="/assets/potato_homepage.png" // <-- use your local asset
              alt="Potato"
              className="w-64 md:w-80 drop-shadow-2xl animate-float"
            />
          </div>
        </motion.div>

        {/* Middle: Location + Prices */}
        <div className="flex flex-col gap-8 col-span-1">
          {/* Location */}
          <Card className="bg-black/95 border border-yellow-500/30 rounded-2xl shadow-[0_0_30px_#FFD36F]/40 p-6">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
              Location
            </h3>
            <input
              type="text"
              placeholder="e.g., Pune, India"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#111] border border-[#444] text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={fetchPrices}
              className="mt-4 px-6 py-3 rounded-xl bg-yellow-400 text-black font-medium shadow-lg hover:bg-yellow-500 transition"
            >
              Get Prices
            </motion.button>
          </Card>

          {/* Prices */}
          <Card className="bg-black/95 border border-yellow-500/30 rounded-2xl shadow-[0_0_30px_#FFD36F]/40 p-6">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-6">
              Potato Prices
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["normal", "sweet", "red"].map((type) => (
                <div
                  key={type}
                  className="flex flex-col items-center bg-[#111] rounded-xl p-4 shadow-[0_0_10px_#FFD36F]/20"
                >
                  <p className="text-lg capitalize text-white/70">{type}</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {loading ? "..." : prices[type] ?? "-"}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Chatbot */}
        <Card className="bg-black/95 border border-yellow-500/30 rounded-2xl shadow-[0_0_30px_#FFD36F]/40 p-6 flex flex-col col-span-1 lg:row-span-2">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
            Potato Chatbot
          </h3>
          <div className="flex-1 bg-[#111] rounded-xl p-4 text-white overflow-y-auto mb-4 shadow-[0_0_10px_#FFD36F]/20">
            <p className="text-white/70">[Chatbot will appear here]</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 rounded-lg bg-[#111] border border-[#444] text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-medium shadow-lg hover:bg-yellow-500 transition"
            >
              Send
            </motion.button>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes float { 
          0%,100%{transform:translateY(0);} 
          50%{transform:translateY(-20px);} 
        }
        .animate-float { 
          animation: float 6s ease-in-out infinite; 
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
