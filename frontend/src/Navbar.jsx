
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "mr", label: "Marathi" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
];

const Navbar = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      );
    };
  }, []);

  const handleChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    document.cookie = `googtrans=/en/${lang};path=/`;
    window.location.reload();
  };

  return (
    <nav className="fixed w-full z-50 bg-darkBackground shadow-md border-b border-[#333]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-potatoYellow tracking-wide">
          Potato Hub
        </h1>

        <div className="flex items-center gap-6 text-lightGray font-label text-lg">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/PotatoOrNot">Potato Detector</NavLink>
          <NavLink to="/DiseaseDetector">Health Check</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>

          <select
            value={selectedLang}
            onChange={handleChange}
            className="bg-darkBackground text-lightGray border border-[#555] rounded-md px-2 py-1 text-sm font-label hover:border-potatoYellow focus:outline-none focus:border-potatoYellow"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative group px-2 py-1 rounded-md hover:text-potatoYellow transition-colors"
  >
    {children}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-potatoYellow transition-all group-hover:w-full"></span>
  </Link>
);

export default Navbar;
