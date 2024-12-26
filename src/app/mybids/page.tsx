"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Define types for Bid and Item
interface Item {
  id: string;
  title: string;
  description: string;
  images: string[];
  currentBid: number;
}

interface Bid {
  id: string;
  item: Item;
  amount: number;
}

export default function MyBidsPage() {
  const [bids, setBids] = useState<Bid[]>([]); // Specify the type of bids as an array of Bid
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const userId = "2"; // Replace with actual user ID (from session or context)

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch(`/api/mybids/${userId}`); // Corrected API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch bids. Status: ${response.status}`);
        }
        const data = await response.json();
        setBids(data);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        setLoading(false);
      }
    };

    fetchBids();
  }, [userId]);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  // Loader Component (matches background color)
  const Loader = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
    </div>
  );

  if (loading) return <Loader />; // Show loader until the page is loaded
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-bold text-teal-400 mb-8">My Bids</h2>

        {bids.length === 0 ? (
          <p>No bids placed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bids.map((bid) => (
              <div
                key={bid.id}
                className="bg-gray-700 p-4 rounded-lg cursor-pointer"
                onClick={() => handleProductClick(bid.item.id)}
              >
                <img
                  src={bid.item.images[0]}
                  alt={bid.item.title}
                  className="object-cover w-full h-64 rounded-lg shadow-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-teal-400">{bid.item.title}</h4>
                <p className="mt-2 text-gray-500">{bid.item.description}</p>
                <p className="mt-4 font-semibold">Bid Amount: ${bid.amount}</p>
                <p className="mt-2 font-semibold">Current Bid: ${bid.item.currentBid}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
