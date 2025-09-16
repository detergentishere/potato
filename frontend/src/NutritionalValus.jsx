
import React from "react";
import { motion } from "framer-motion";


import PotatoNutrition from "./assets/potato_nutrition.jpg";
import PotatoVitamin from "./assets/potato_vitamin.jpg";
import PotatoMinerals from "./assets/potato_minerals.jpg";

const NutritionalValus = () => (
  <div className="min-h-screen relative bg-black text-white font-serif px-6 py-24">
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{ backgroundImage: `url(${PotatoNutrition})` }}
    ></div>
    <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

    <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-[#E6C067] drop-shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Nutritional Value of Potatoes
      </motion.h1>

      <motion.div
        className="flex flex-col gap-10 text-white/90 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Macronutrients */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={PotatoNutrition}
            alt="Potato Nutrition"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <div className="md:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-[#E6C067]">
              Carbs & Energy
            </h2>
            <p>
              Potatoes are primarily a carbohydrate source. One medium potato (~150g) provides around 26g of carbs and 110 calories. They are low in fat and an excellent energy source for daily activities.
            </p>
          </div>
        </div>

        {/* Vitamins */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={PotatoVitamin}
            alt="Potato Vitamins"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <div className="md:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-[#E6C067]">Vitamins</h2>
            <p>
              Potatoes are rich in Vitamin C, which supports immunity and skin health. They also contain small amounts of B-complex vitamins such as B6 (pyridoxine) which help metabolism and nerve function.
            </p>
          </div>
        </div>

        {/* Minerals */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={PotatoMinerals}
            alt="Potato Minerals"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <div className="md:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-[#E6C067]">Minerals</h2>
            <p>
              Potatoes are an excellent source of potassium, which supports heart and muscle function. They also provide magnesium, iron, and phosphorus, making them a nutrient-dense staple.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default NutritionalValus;
