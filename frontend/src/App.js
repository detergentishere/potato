import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Fonts
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/montserrat/500.css";

// Components
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import PotatoOrNot from "./PotatoOrNot";
import DiseaseDetector from "./DiseaseDetector";
import PriceDetector from "./PriceDetector";
import About from "./About";
import Footer from "./footer";
import Loader from "./Loader"; // Loader component

// Layout to handle loader on route change
const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader whenever location changes
    setLoading(true);

    // Simulate page load delay / or preload images
    const timer = setTimeout(() => setLoading(false), 1000); // 1s delay
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
          <Route path="/PriceDetector" element={<PriceDetector />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
