import React from "react";

const Footer = () => {
  return (
    <footer className="bg-darkBackground text-lightGray py-6 border-t border-[#333]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        
        {/* Social Links */}
        <div className="flex gap-6">
          <a 
            href="https://github.com/detergentishere" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-label hover:text-potatoYellow transition"
          >
            GitHub
          </a>
          <a 
            href="https://in.linkedin.com/in/isha-suryawanshi-9048b4336" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-label hover:text-potatoYellow transition"
          >
            LinkedIn
          </a>
          <a 
            href="mail to: suryawanshiisha143@gmail.com" 
            className="font-label hover:text-potatoYellow transition"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
