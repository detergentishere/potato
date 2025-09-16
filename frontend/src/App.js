import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/montserrat/500.css";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import PotatoOrNot from "./PotatoOrNot";
import DiseaseDetector from "./DiseaseDetector";
import About from "./About";
import Footer from "./footer";
import Loader from "./Loader";

import BlogsPage from "./BlogsPage";
import AboutPotato from "./AboutPotato";
import PotatoRecipes from "./PotatoRecipes";
import PotatoDiseases from "./PotatoDiseases";
import NutritionalValue from "./NutritionalValus";
import PotatoFunFacts from "./PotatoFunFacts";

const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <div className={`${loading ? "hidden" : "flex flex-col min-h-screen"}`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/PotatoOrNot" element={<PotatoOrNot />} />
          <Route path="/DiseaseDetector" element={<DiseaseDetector />} />
          <Route path="/about" element={<About />} />

          {/* Blogs */}
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/about-potato" element={<AboutPotato />} />
          <Route path="/potato-recipes" element={<PotatoRecipes />} />
          <Route path="/potato-diseases" element={<PotatoDiseases />} />
          <Route path="/nutritional-value" element={<NutritionalValue />} />
          <Route path="/potato-fun-facts" element={<PotatoFunFacts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
