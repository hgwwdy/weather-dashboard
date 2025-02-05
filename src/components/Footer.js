import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-0">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SkyCast. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with 💙 by Hibst Getachew
        </p>
      </div>
    </footer>
  );
};

export default Footer;
