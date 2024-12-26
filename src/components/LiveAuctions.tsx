"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image"; // Import the Image component from next/image

// Use relative path to import images (for local images inside the project)
import cameraImage from "../app/images/camera.png";
import jewelImage from "../app/images/jewel.png";
import shoesImage from "../app/images/shoes.png";

export default function LiveAuctions() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const auctionData = [
    {
      id: 1,
      title: "Vintage Camera",
      description: "A classic camera from the 1950s, still in great condition.",
      image: cameraImage,
      currentBid: "$500",
      lastBidTime: "Dec 1, 2024, 10:30 PM",
    },
    {
      id: 2,
      title: "Antique Jewelry Box",
      description: "An intricately designed jewelry box from the Victorian era.",
      image: jewelImage,
      currentBid: "$750",
      lastBidTime: "Dec 2, 2024, 8:00 AM",
    },
    {
      id: 3,
      title: "Limited Edition Sneakers",
      description: "Exclusive sneakers by a renowned brand, perfect for collectors.",
      image: shoesImage,
      currentBid: "$1,200",
      lastBidTime: "Dec 2, 2024, 9:15 AM",
    },
  ];

  return (
    <div className="bg-gray-950 py-16 text-white">
      {/* Live Auctions Header */}
      <section className="text-center" data-aos="fade-down">
        <h2 className="text-4xl font-bold text-teal-500">Live Auctions</h2>
        <p className="mt-4 text-lg text-gray-400">
          Explore live auctions happening now and place your bids before the timer runs out!
        </p>
      </section>

      {/* Auction Items */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md animate-pulse"
                data-aos="fade-up"
              >
                <div className="w-full h-40 bg-gray-700 rounded-md"></div>
                <div className="mt-4 h-5 bg-gray-700 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-700 rounded w-full"></div>
                <div className="mt-2 h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))
          : auctionData.map((auction) => (
              <div
                key={auction.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:translate-y-[-5px] relative"
                data-aos="fade-up"
              >
                {/* Auction Image with Next.js Image component */}
                <div className="relative w-full h-48">
                  <Image
                    src={auction.image}
                    alt={auction.title}
                    layout="fill" // This makes the image fill the container while maintaining aspect ratio
                    objectFit="cover" // Ensures the image covers the entire container without stretching
                    className="rounded-lg"
                  />
                </div>
                {/* Auction Details */}
                <div className="mt-6"> {/* Increased margin-top here */}
                  <h3 className="text-xl font-semibold text-teal-400">
                    {auction.title}
                  </h3>
                  <p className="mt-2 text-gray-300 text-sm">{auction.description}</p>
                </div>
                {/* Current Bid */}
                <div className="mt-4">
                  <p className="text-sm text-gray-400">
                    Current Bid:{" "}
                    <span className="font-bold text-yellow-400">
                      {auction.currentBid}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mb-7">Last Bid Time: {auction.lastBidTime}</p>
                </div>
                {/* Action Button */}
                <a
                  href="/searchresults"
                  className="mt-10 w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-all text-sm text-center"
                >
                  Place Your Bid
                </a>
              </div>
            ))}
      </section>

      {/* See More Button */}
      <div className="text-center mt-12">
        <a
          href="/searchresults"
          className="inline-block bg-teal-500 text-white py-3 px-8 rounded-lg hover:bg-teal-600 transition-all text-lg font-semibold"
        >
          See More
        </a>
      </div>
    </div>
  );
}
