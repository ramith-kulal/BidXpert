"use client";
import React, { useState } from "react";
import Image from "next/image"; // Import Next.js Image component
import image from "../../images/loginpage.avif"; // Import image

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Password validation using regex
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include a number, a special character, and a letter."
      );
      setLoading(false);
      return;
    }

    // Make POST request to the backend
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        // Success
        alert("Account created successfully!");
        window.location.href = "/auth/signin";
      } else {
        // Handle errors
        setError(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error during signup:", err); // Log the error for debugging
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-300 justify-center items-center">
      <section className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <a href="#" className="text-2xl font-semibold text-gray-800 mb-6">
            Bid Xpert
          </a>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create a new account
          </h1>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-gray-800"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-800"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-gray-800"
                placeholder="+91 XXXXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-800"
              >
                User Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-gray-800"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-gray-800"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/auth/signin"
                className="text-green-600 hover:underline"
              >
                Login
              </a>
            </p>
          </form>
        </div>
        <div className="w-full sm:w-1/2 hidden sm:block relative">
          <Image
            src={image}
            alt="Sign In Illustration"
            objectFit="cover"
            className="absolute top-20 md:auto"
          />
        </div>
      </section>
    </div>
  );
}
