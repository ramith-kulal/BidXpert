"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between">
        {/* Footer Links */}
        <div>
          <h4 className="font-bold text-lg text-red-600">BidXpert</h4>
          <ul className="mt-4">
            <li>
              <a href="#about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#faq" className="text-gray-400 hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        {/* Social Media */}
        <div className="mt-6 sm:mt-0">
          <h4 className="font-bold text-lg text-red-600">Follow Us</h4>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
