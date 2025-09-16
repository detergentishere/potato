// src/BlogsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import local images from assets folder
import AboutPotatoImg from "./assets/potato_field.jpg";
import RecipesImg from "./assets/indian_potato.jpg";
import DiseasesImg from "./assets/potato_blight.jpg";
import NutritionImg from "./assets/potato_nutrition.jpg";

const blogCards = [
  { 
    title: "About Potato", 
    description: "History, cultivation, and global importance.", 
    link: "/about-potato", 
    image: AboutPotatoImg 
  },
  { 
    title: "Potato Recipes", 
    description: "Indian & international recipes for every taste.", 
    link: "/potato-recipes", 
    image: RecipesImg 
  },
  { 
    title: "Potato Diseases", 
    description: "Identify and prevent common potato diseases.", 
    link: "/potato-diseases", 
    image: DiseasesImg 
  },
  { 
    title: "Nutritional Value", 
    description: "Health benefits and nutrients in potatoes.", 
    link: "/nutritional-value", 
    image: NutritionImg 
  },
];

const BlogsPage = () => (
  <div className="min-h-screen relative bg-black text-white font-serif px-6 py-24">
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{ backgroundImage: `url(${AboutPotatoImg})` }}
    ></div>
    <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

    <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-[#E6C067] drop-shadow-xl text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Potato Blog Hub
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {blogCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <Link
              to={card.link}
              className="bg-[#1C1C1C]/90 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(230,192,103,0.4)] transition-transform transform hover:-translate-y-2"
            >
              <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
                <p className="text-white/80 mb-4">{card.description}</p>
                <span className="text-[#E6C067] font-bold">Read More →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default BlogsPage;
