import React from "react";
import HeroPotato from "./assets/download4.jpg";
import Potato1 from "./assets/download1.jpg";
import Potato2 from "./assets/download2.jpg";
import Potato3 from "./assets/download3.jpg";

const About = () => {
  const potatoImages = [Potato1, Potato2, Potato3]; 

  return (
    <div className="font-serif bg-black text-white min-h-screen pt-24">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#E6C067] drop-shadow-xl mb-4 tracking-tight">
            About Potato Hub
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-lg">
            Potato Hub is a premium platform for potato enthusiasts! Explore everything from potato facts, market trends, health detection, and interactive tools — all in one elegant hub.
          </p>
        </div>

        {/* Floating Hero Potato */}
        <div className="flex-1 flex justify-center md:justify-end animate-float">
          <img
            src={HeroPotato}
            alt="Hero Potato Illustration"
            className="w-48 md:w-64 drop-shadow-2xl rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        <div className="bg-[#1A1A1A]/70 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_40px_#FFD36F]/30 hover:shadow-[0_0_60px_#FFD36F]/50 transition duration-500 text-center border border-transparent">
          <h3 className="text-2xl text-[#FFD36F] font-semibold mb-3">Our Mission</h3>
          <p className="text-white/80 leading-relaxed">
            Celebrate the ultimate king of vegetables — the potato. Providing knowledge, fun, and interactive tools for potato lovers worldwide.
          </p>
        </div>
        <div className="bg-[#1A1A1A]/70 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_40px_#FFD36F]/30 hover:shadow-[0_0_60px_#FFD36F]/50 transition duration-500 text-center border border-transparent">
          <h3 className="text-2xl text-[#FFD36F] font-semibold mb-3">Our Vision</h3>
          <p className="text-white/80 leading-relaxed">
            To be the premium destination for potato enthusiasts, combining entertainment, education, and technology into one hub for all things potato.
          </p>
        </div>
      </section>

      {/* Bottom Image Grid */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {potatoImages.map((img, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-3xl shadow-[0_0_30px_#FFD36F]/30 hover:shadow-[0_0_50px_#FFD36F]/50 transition duration-500"
          >
            <img
              src={img}
              alt={`Potato Fun ${idx + 1}`}
              className="w-full h-48 md:h-56 object-cover object-center transform hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </section>

      {/* Info Cards */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div className="bg-[#1A1A1A]/70 backdrop-blur-md p-6 rounded-3xl shadow-[0_0_40px_#FFD36F]/30 hover:shadow-[0_0_60px_#FFD36F]/50 transition duration-500 text-center border border-transparent">
          <h4 className="text-xl font-semibold text-[#FFD36F] mb-2">Potato Facts</h4>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            Learn interesting facts about potatoes, their varieties, nutrition, and historical importance.
          </p>
        </div>
        <div className="bg-[#1A1A1A]/70 backdrop-blur-md p-6 rounded-3xl shadow-[0_0_40px_#FFD36F]/30 hover:shadow-[0_0_60px_#FFD36F]/50 transition duration-500 text-center border border-transparent">
          <h4 className="text-xl font-semibold text-[#FFD36F] mb-2">Market Trends</h4>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            Stay up-to-date with current potato prices, trends, and crop insights from different regions.
          </p>
        </div>
        <div className="bg-[#1A1A1A]/70 backdrop-blur-md p-6 rounded-3xl shadow-[0_0_40px_#FFD36F]/30 hover:shadow-[0_0_60px_#FFD36F]/50 transition duration-500 text-center border border-transparent">
          <h4 className="text-xl font-semibold text-[#FFD36F] mb-2">Health Checks</h4>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            Use AI-powered tools to detect potato diseases, maintain crop health, and optimize yield.
          </p>
        </div>
      </section>

      <style>{`
        @keyframes float { 
          0%,100%{transform:translateY(0);} 
          50%{transform:translateY(-10px);} 
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default About;
