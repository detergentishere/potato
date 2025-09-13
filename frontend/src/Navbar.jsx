import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-darkBackground shadow-md border-b border-[#333]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-potatoYellow tracking-wide">
          Potato Hub
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-8 text-lightGray font-label text-lg">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/PotatoOrNot">Potato Detector</NavLink>
          <NavLink to="/DiseaseDetector">Health Check</NavLink>
          <NavLink to="/PriceDetector">Price Guide</NavLink>
          <NavLink to="/about">About</NavLink>
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
