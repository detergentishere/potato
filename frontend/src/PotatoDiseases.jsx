
import React from "react";
import { motion } from "framer-motion";

const PotatoDiseases = () => (
  <div className="min-h-screen relative bg-black text-white font-serif px-6 py-24">
    {/* Background overlay */}
    <div className="absolute inset-0 bg-black/90"></div>

    <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-12">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-[#E6C067] drop-shadow-xl text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Potato Diseases & Prevention
      </motion.h1>

      <motion.div
        className="flex flex-col gap-10 text-white/90 text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Healthy Plants */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-[#E6C067]">Healthy Plants</h2>
          <p>
            Healthy potatoes have firm tubers and green leaves. Maintaining proper
            irrigation, crop rotation, and soil health ensures strong yields.
          </p>
        </div>

        {/* Late Blight */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-[#E6C067]">Late Blight</h2>
          <p>
            Caused by <em>Phytophthora infestans</em>, it leads to brown lesions on
            leaves and rotting tubers. Prevention includes fungicides, resistant
            varieties, and removing infected plants.
          </p>
        </div>

        {/* Leaf Curl */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-[#E6C067]">Leaf Curl & Pests</h2>
          <p>
            Aphids, nematodes, and viral infections can curl leaves, reducing yield.
            Crop rotation, natural predators, and organic treatments help mitigate
            damage.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default PotatoDiseases;
