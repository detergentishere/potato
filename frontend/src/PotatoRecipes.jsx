
import React from "react";
import { motion } from "framer-motion";

import IndianDish from "./assets/indian_potato.jpg";
import FrenchFries from "./assets/french_fries.jpg";
import Mashed from "./assets/mashed_potato.jpg";

const PotatoRecipes = () => (
  <div className="min-h-screen relative bg-black text-white font-serif px-6 py-24">
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{ backgroundImage: `url(${IndianDish})` }}
    ></div>
    <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

    <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-[#E6C067] drop-shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Potato Recipes
      </motion.h1>

      <motion.div
        className="flex flex-col gap-10 text-white/90 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Indian Recipes */}
        <div className="flex flex-col md:flex-row gap-6">
          <img src={IndianDish} alt="Aloo Gobi" className="w-full md:w-1/2 rounded-2xl shadow-lg" />
          <div className="md:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-[#E6C067]">Indian Delights</h2>
            <p>
              India has a rich variety of potato recipes. Popular dishes include Aloo Gobi, Dum Aloo, Samosas, and Aloo Paratha. Potatoes are versatile and complement spices and vegetables perfectly.
            </p>
          </div>
        </div>

        {/* French Fries / Western Recipes */}
        <div className="flex flex-col md:flex-row gap-6">
          <img src={FrenchFries} alt="French Fries" className="w-full md:w-1/2 rounded-2xl shadow-lg" />
          <div className="md:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-[#E6C067]">Western Favorites</h2>
            <p>
              Classic dishes include French fries, mashed potatoes, baked potatoes, and gratins. Potatoes are also used in soups and stews. They’re loved worldwide for their comfort-food appeal.
            </p>
          </div>
        </div>

        {/* Mashed and other versatile dishes */}
        <div className="flex flex-col md:flex-row gap-6">
          <img src={Mashed} alt="Mashed Potato" className="w-full md:w-1/2 rounded-2xl shadow-lg" />
          <div className="md:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-[#E6C067]">Versatile & Quick</h2>
            <p>
              Potatoes can be quickly boiled, mashed, or roasted for a nutritious side. They absorb flavors well and pair with proteins, sauces, and vegetables. Easy recipes make them perfect for home cooking.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default PotatoRecipes;
