import React from "react";

const Footer = () => {
  return (
    <footer className="bg-darkBackground text-lightGray py-6 border-t border-[#333]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-sm">&copy; 2025 Potato Hub. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="font-label hover:text-potatoYellow transition">GitHub</a>
          <a href="#" className="font-label hover:text-potatoYellow transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
