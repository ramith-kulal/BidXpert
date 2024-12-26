"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Effect to detect scroll and change navbar background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/searchresults`);
  };

  return (
    <div
      className={`flex justify-between items-center p-4 shadow-md fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white bg-opacity-80" : "bg-transparent"
      }`}
    >
      {/* Title (Always on the left) */}
      <h1
        className={`text-3xl font-bold mx-6 transition-colors duration-300 ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        BidXpert
      </h1>

      {/* Navbar Links (Visible on large screens) */}
      <div className="hidden lg:flex space-x-16 ml-20">
        <Link
          href="/"
          className={`text-xl hover:text-gray-700 transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          Home
        </Link>
        <Link
          href="/searchresults"
          className={`text-xl hover:text-gray-700 transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          Auctions
        </Link>
        <Link
          href="/dashboard"
          className={`text-xl hover:text-gray-700 transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/mybids"
          className={`text-xl hover:text-gray-700 transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          My Bids
        </Link>
        <Link
          href="/sell"
          className={`text-xl hover:text-gray-700 transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          Sell
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-1 justify-end lg:justify-end">
        <form className="relative w-full max-w-lg" onSubmit={handleSubmit}>
          <label htmlFor="default-search" className="sr-only">
            Search
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Auctions, Items..."
              required
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Dropdown Button */}
      <div className="relative lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center text-white p-2"
        >
          <span className="mr-2">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-12 right-0 w-48 bg-white border-t border-gray-300 shadow-md ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col space-y-8 p-4">
            <Link href="/" className="text-black hover:text-gray-600">
              Home
            </Link>
            <Link href="/searchresults" className="text-black hover:text-gray-600">
              Auctions
            </Link>
            <Link href="/mybids" className="text-black hover:text-gray-600">
              My Bids
            </Link>
            <Link href="/sell" className="text-black hover:text-gray-600">
              Sell
            </Link>
            <Link href="/dashboard" className="text-black hover:text-gray-600">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
