"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

// Importing images directly
import smartWatchPro from "../app/images/smartwatch.png";
import wirelessHeadphones from "../app/images/headphone.png";
import ecoFriendlyBackpack from "../app/images/bag.png";

export default function TrendingItems() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 800 });

    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Example trending items data with imported images
  const trendingData = [
    {
      id: 1,
      title: "Smart Watch Pro",
      description: "The latest in wearable tech with cutting-edge features.",
      image: smartWatchPro, // Imported image
    },
    {
      id: 2,
      title: "Wireless Headphones",
      description: "Crystal-clear sound and a sleek, trendy design.",
      image: wirelessHeadphones, // Imported image
    },
    {
      id: 3,
      title: "Eco-Friendly Backpack",
      description: "Stylish and sustainable, perfect for all your needs.",
      image: ecoFriendlyBackpack, // Imported image
    },
  ];

  return (
    <div className="bg-gray-950 py-16 text-white">
      {/* Trending Items Section */}
      <section className="text-center" data-aos="fade-down">
        <h2 className="text-4xl font-bold text-red-700">Trending Items</h2>
        <p className="mt-4 text-lg text-gray-400">
          Check out the most popular items that everyone is talking about!
        </p>
      </section>

      {/* Trending Items Grid */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-md animate-pulse"
                data-aos="fade-up"
              >
                <div className="w-full h-48 bg-gray-700 rounded-md"></div>
                <div className="mt-4 h-6 bg-gray-700 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-700 rounded w-full"></div>
              </div>
            ))
          : trendingData.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-red-600 transition-shadow"
                data-aos="fade-up"
              >
                {/* Item Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill" // Ensures the image covers the entire container
                    objectFit="cover" // Maintain aspect ratio without stretching
                    className="rounded-md"
                  />
                </div>
                {/* Item Details */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-red-600">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-300">{item.description}</p>
                </div>
                {/* View Item Button */}
                <div className="mt-6">
                  <button className="w-full bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 transition-colors">
                    View Item
                  </button>
                </div>
              </div>
            ))}
      </section>
    </div>
  );
}
