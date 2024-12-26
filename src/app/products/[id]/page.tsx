'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
interface Product {
    id: string;
    title: string;
    description: string;
    images: string[];
    startingBid: number;
    currentBid: number;
    auctionDuration: number;
  }
  
  interface OtherProduct {
    id: string;
    title: string;
    description: string;
    images: string[];
    startingBid: number;
    currentBid: number;
  }
  
export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [otherProducts, setOtherProducts] = useState<OtherProduct[]>([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [userBid, setUserBid] = useState<number | string>(''); // Track the user's bid input

  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      console.log('No ID found in the route.');
      setLoading(false);
      setError('No product ID provided in the URL.');
      return;
    }

    // Fetch the specific product data
    fetch(`/api/product/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch product. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Fetch other products
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setOtherProducts(data);
      })
      .catch((err) => {
        console.error('Error fetching other products:', err.message);
      });
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

 

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserBid(e.target.value);
  };

  const handlePlaceBid = async () => {
    if (!userBid || isNaN(Number(userBid)) || Number(userBid) <= product.currentBid) {
      alert(`Bid must be greater than the current bid by at least $10`);
      return;
    }

    const newBid = Number(userBid);

    // Ensure the bid increase is valid (minimum increment of $10)
    if (newBid < product.currentBid + 10) {
      alert(`Bid must be at least $10 higher than the current bid`);
      return;
    }

    try {
      // Send the new bid to the backend for updating
      const response = await fetch(`/api/product/${id}/place-bid`, {
        method: 'POST',
        body: JSON.stringify({ bid: newBid, userId: 1 }), // Add actual userId here
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProduct(updatedProduct); // Update the product data with the new bid
      } else {
        alert('Failed to place bid. Please try again.');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Error placing bid. Please try again.');
    }
  };

  // Loader Component (matches background color)
  const Loader = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
    </div>
  );

  if (loading) return <Loader />; // Show loader until the page is loaded
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center py-12">
      <header className="bg-gray-800 w-full py-4">
       <Navbar/>
      </header>

      <div className="container mx-auto p-4">
        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Product Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={product.images[0]}
              alt={product.title}
              className="object-cover w-full h-96 rounded-lg shadow-lg"
            />
          </div>
          {/* Product Info */}
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-4xl font-bold text-teal-400 mb-4">{product.title}</h2>
            <div className="mb-4">
              <p className="font-semibold text-lg">Starting Bid: ${product.startingBid}</p>
              <p className="font-semibold text-lg">Current Bid: ${product.currentBid}</p>
              <p className="text-gray-500">Auction Duration: {product.auctionDuration} hours</p>
            </div>

            {/* Place Bid Section */}
            <div className="mt-4">
              <input
                type="number"
                value={userBid}
                onChange={handleBidChange}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your bid"
              />
              <button
                onClick={handlePlaceBid}
                className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4">Description</h3>
          <p className="text-gray-300 mb-4">
            {showFullDescription ? product.description : `${product.description.substring(0, 150)}...`}
          </p>
          <button
            onClick={toggleDescription}
            className="text-teal-400 hover:text-teal-600"
          >
            {showFullDescription ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {/* More Products Section */}
        <div className="mt-12 w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-teal-400 mb-4">More Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {otherProducts.map((otherProduct: OtherProduct) => (
              <div
                key={otherProduct.id}
                className="bg-gray-700 p-4 rounded-lg cursor-pointer"
                onClick={() => handleProductClick(otherProduct.id)}
              >
                {/* Product Image */}
                <img
                  src={otherProduct.images[0]}
                  alt={otherProduct.title}
                  className="object-cover w-full h-64 rounded-lg shadow-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-teal-400">{otherProduct.title}</h4>
                <p className="mt-2 text-gray-500">{otherProduct.description}</p>
                <p className="mt-4 font-semibold">Starting Bid: ${otherProduct.startingBid}</p>
                <p className="mt-2 font-semibold">Current Bid: ${otherProduct.currentBid}</p>
                <button className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition">
                  View Product
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}