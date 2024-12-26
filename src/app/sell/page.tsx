"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

// Defining types for the state variables
interface ImageFile extends File {
  name: string;
}

export default function UploadAuctionItem() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [startingBid, setStartingBid] = useState<string>("");
  const [auctionDuration, setAuctionDuration] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");


  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !startingBid || !auctionDuration || images.length === 0) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('startingBid', startingBid);
    formData.append('auctionDuration', auctionDuration);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      setLoading(true);
      setError("");
      
      const response = await axios.post("/api/auctionitems", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response from server:", response.data);

      setSuccessMessage("Item added successfully!");

      setTitle("");
      setDescription("");
      setImages([]);
      setStartingBid("");
      setAuctionDuration("");
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("Failed to add auction item.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center py-12 relative">
      <Navbar />

      <div className="mt-10 block text-teal-400 mb-2 font-semibold"><h1>Sell Your Item</h1></div>

      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-teal-400 mb-2 font-semibold">
            Item Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter item title"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-teal-400 mb-2 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-teal-400 mb-2 font-semibold">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageUpload}
            className="block w-full text-gray-500 bg-gray-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {images.length > 0 && (
            <p className="mt-2 text-gray-400">Uploaded {images.length} image(s).</p>
          )}
        </div>

        <div>
          <label htmlFor="startingBid" className="block text-teal-400 mb-2 font-semibold">
            Starting Bid ($)
          </label>
          <input
            type="number"
            id="startingBid"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            placeholder="Enter starting bid amount"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label htmlFor="auctionDuration" className="block text-teal-400 mb-2 font-semibold">
            Auction Duration (Days)
          </label>
          <input
            type="number"
            id="auctionDuration"
            value={auctionDuration}
            onChange={(e) => setAuctionDuration(e.target.value)}
            placeholder="Enter duration in days"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add to Auction"}
        </button>
      </form>
    </div>
  );
}
