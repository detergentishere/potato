
import React from "react";
import { motion } from "framer-motion";


import PotatoField from "./assets/potato_field.jpg";
import PotatoTypes from "./assets/potato_types.jpg";
import PotatoIndustry from "./assets/potato_industry.jpg";

const AboutPotato = () => (
  <div className="min-h-screen relative bg-black text-white font-[Poppins] px-6 py-24">
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{ backgroundImage: `url(${PotatoField})` }}
    ></div>
    <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

    <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-12">
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-[#E6C067] drop-shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Potato
      </motion.h1>

      <motion.div
        className="text-white/90 text-base md:text-lg flex flex-col gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={PotatoField}
            alt="Potato Field"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <p className="md:w-1/2">
            Potatoes originated in the Andean region of South America, primarily
            in modern-day Peru and Bolivia over 7,000 years ago. Indigenous
            peoples cultivated hundreds of varieties as a staple food. Today,
            potatoes are grown globally in diverse climates.
          </p>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={PotatoTypes}
            alt="Potato Varieties"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <p className="md:w-1/2">
            There are thousands of potato varieties. They vary in size, color,
            and texture. Some are best for boiling, others for frying, and some
            for making chips or mashed potatoes. Their versatility is one reason
            for their global popularity.
          </p>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={PotatoIndustry}
            alt="Potato Industry"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <p className="md:w-1/2">
            Beyond food, potatoes have industrial uses. Starch extracted from
            potatoes is used in textiles, adhesives, paper, and biodegradable
            plastics. In some regions, potato leaves and waste are being
            explored for biofuel production.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default AboutPotato;
