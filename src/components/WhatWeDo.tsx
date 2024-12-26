"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import the AOS styles

export default function WhatWeDo() {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Only animate once
    });
  }, []);

  return (
    <div className="bg-black py-16">
      {/* What We Do Section */}
      <section className="text-center text-white">
        <h2 className="text-3xl font-bold text-red-600" data-aos="fade-up">
          What We Do
        </h2>
        <p
          className="mt-4 text-lg text-gray-400 mx-auto max-w-3xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          At BidXpert, we specialize in providing a seamless auction experience
          for both buyers and sellers. We offer a platform where users can
          easily bid on items, participate in live auctions, and sell their
          products to a global audience.
        </p>
      </section>

      {/* Customer Reviews Section */}
      <section className="mt-16 px-6">
        <h3 className="text-2xl font-semibold text-center text-red-600" data-aos="fade-up">
          What Our Customers Are Saying
        </h3>

        {/* Review Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-md opacity-0 transform translate-x-16 transition-all duration-700 hover:opacity-100 hover:translate-x-0"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p className="text-lg text-gray-300 italic">
              &quot;BidXpert made my auction experience so easy! I won several bids
              and had the best time.&quot;
            </p>
            <div className="mt-4 flex items-center justify-start">
              <img
                src="https://via.placeholder.com/40"
                alt="Customer"
                className="rounded-full w-10 h-10 object-cover"
              />
              <div className="ml-4">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm text-gray-500">Verified Buyer</p>
                <div className="flex mt-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-md opacity-0 transform translate-x-16 transition-all duration-700 hover:opacity-100 hover:translate-x-0"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <p className="text-lg text-gray-300 italic">
              &quot;The bidding process was smooth, and I got a great deal. Highly
              recommend!&quot;
            </p>
            <div className="mt-4 flex items-center justify-start">
              <img
                src="https://via.placeholder.com/40"
                alt="Customer"
                className="rounded-full w-10 h-10 object-cover"
              />
              <div className="ml-4">
                <p className="font-medium text-white">Sarah Smith</p>
                <p className="text-sm text-gray-500">Regular Seller</p>
                <div className="flex mt-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-md opacity-0 transform translate-x-16 transition-all duration-700 hover:opacity-100 hover:translate-x-0"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <p className="text-lg text-gray-300 italic">
              &quot;I was able to sell my product quickly and effortlessly. Great
              platform for sellers!&quot;
            </p>
            <div className="mt-4 flex items-center justify-start">
              <img
                src="https://via.placeholder.com/40"
                alt="Customer"
                className="rounded-full w-10 h-10 object-cover"
              />
              <div className="ml-4">
                <p className="font-medium text-white">Michael Johnson</p>
                <p className="text-sm text-gray-500">Seller</p>
                <div className="flex mt-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
