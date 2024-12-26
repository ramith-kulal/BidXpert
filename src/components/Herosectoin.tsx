"use client";
import React from "react";
import Image from "next/image";
import image from "../app/images/herophoto1.jpg"; // Import the image

export default function Herosection() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-gray-100">
      {/* Background Image for Larger Screens */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Hero Image"
          layout="fill" // Makes the image cover the entire div
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Content inside the hero section for Mobile */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white p-6 md:hidden">
        {/* Mobile Card Layout */}
        <div className="flex flex-col items-center bg-border-black border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-100 dark:hover:bg-gray-200">
          {/* Image inside card for small screens */}
          <Image
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={image}
            alt="Hero Image"
            width={480}
            height={384}
            quality={100}
          />

          {/* Content inside the card */}
          <div className="flex flex-col justify-between p-4 leading-normal">
            {/* Main Heading */}
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
              Bid, Buy &amp; Sell What You Love
            </h5>

            {/* Subheading */}
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
              List your items for auction, <span className="text-black">Bid</span> on exciting products, or sell tickets, art, and more.
            </p>

            {/* Single Call-to-Action Button */}
            <a
              href="/searchresults"
              className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-300 transform hover:scale-105"
            >
              Bid Now, Discover What&apos;s Hot!🔥
            </a>
          </div>
        </div>
      </div>

      {/* Content inside the hero section for larger screens */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full text-left text-white p-6 md:flex">
        {/* Main Heading */}
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
          Bid, Buy &amp; Sell What You Love
        </h1>

        {/* Subheading */}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
          List your items for auction, <span className="text-black">Bid</span> on exciting products, or sell tickets, art, and more.
        </p>

        {/* Call-to-Action Button, visible only on desktop */}
        <a
          href="/searchresults"
          className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-300 transform hover:scale-105"
        >
          Bid Now, Discover What&apos;s Hot!🔥
        </a>
      </div>
    </div>
  );
}
