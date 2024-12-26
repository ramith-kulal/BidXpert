"use client";
import React, { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  startingBid: string;
  currentBid: string;
  auctionDuration: number;
  bids: number;
  category: string;
}

export default function SearchResults() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("All");
  const [showFullDescription, setShowFullDescription] = useState<Record<string, boolean>>({});


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Product[] = await response.json();
        setResults(data);
        setFilteredResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDescriptionToggle = (id: string) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number): T => {
    let timer: NodeJS.Timeout;
    return ((...args: unknown[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    }) as T;
  };
  

  const handleSearch = debounce(() => {
    setIsLoading(true);
    let updatedResults = results;

    if (category !== "All") {
      updatedResults = updatedResults.filter((item) => item.category === category);
    }

    if (searchQuery) {
      updatedResults = updatedResults.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResults(updatedResults);
    setIsLoading(false);
  }, 500);

  const handleSort = (type: string) => {
    const sortedResults = [...filteredResults].sort((a, b) => {
      if (type === "price") return parseFloat(a.currentBid) - parseFloat(b.currentBid);
      if (type === "bids") return b.bids - a.bids;
      return 0;
    });
    setFilteredResults(sortedResults);
  };

  const handleProductClick = (id: string) => {
    window.location.href = `/products/${id}`;
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <header className="bg-gray-800 py-4 px-6 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 justify-between">
          <h1 className="text-2xl font-bold text-teal-500">BidXpert</h1>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search everything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleSearch}
              className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition w-full sm:w-auto"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <div className="bg-gray-800 py-4 px-6 shadow-md sticky top-14 z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-teal-500 w-full sm:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Live Auctions">Live Auctions</option>
            <option value="Products">Products</option>
          </select>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-teal-500 w-full sm:w-auto"
          >
            <option value="price">Sort by Price</option>
            <option value="bids">Sort by Bids</option>
          </select>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-teal-400 mb-6">
          Explore Everything
        </h1>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-800 p-6 rounded-lg shadow">
                <div className="w-full h-40 bg-gray-700 rounded-md"></div>
                <div className="mt-4 h-6 bg-gray-700 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="mt-4 h-5 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredResults) && filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleProductClick(item.id)}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                {item.images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1} for ${item.title}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ))}
                <h2 className="mt-4 text-lg font-semibold text-teal-400">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-gray-300">{item.description}</p>
                <p className="mt-4 text-lg font-bold text-yellow-400">
                  Starting Bid: ${item.startingBid}
                </p>
                <p className="mt-2 text-lg font-bold text-yellow-400">
                  Current Bid: ${item.currentBid}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Auction Duration: {item.auctionDuration} hours
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDescriptionToggle(item.id);
                  }}
                  className="mt-2 text-sm text-teal-500"
                >
                  {showFullDescription[item.id] ? "See Less" : "See More"}
                </button>
                {showFullDescription[item.id] && (
                  <p className="mt-4 text-sm text-gray-300">{item.fullDescription}</p>
                )}
                <p className="mt-2 text-sm text-gray-400">
                  {item.bids} bids placed
                </p>
                <button className="mt-4 w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition text-sm">
                  {item.category === "Live Auctions" ? "Place a Bid" : "Buy Now"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-12">
              No results found. Try searching for something else.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
