"use client";
import React, { useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import image from "../../images/loginpage.avif"; // Import image

export default function Page() {
  const [email, setEmail] = useState(''); // Initialize email state
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 // Use Next.js router for navigation

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    setErrorMessage('Email and password are required!');
    return;
  }

  setIsLoading(true);
  setErrorMessage('');

  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.message === 'Login successful!') {
      // Redirect to dashboard after successful login
      window.location.href = "/";
    } else {
      setErrorMessage(data.error || 'Invalid login credentials!');
    }
  } catch (err: unknown) {
    // Use the error to satisfy the rule
    console.error('Network error:', err);
    setErrorMessage('Network error. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex min-h-screen bg-gray-300 justify-center items-center">
      <section className="flex w-full max-w-4xl bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <a href="#" className="text-2xl font-semibold text-gray-800 mb-6">
            Bid Xpert
          </a>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Sign in to your account
          </h1>

          {/* Display error message */}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-2 mb-4 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-gray-800"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-gray-800"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            <p className="text-sm text-gray-500">
              Don’t have an account yet?{' '}
              <a href="/auth/signup" className="text-green-600 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Right Section for Image */}
        <div className="w-full sm:w-1/2 hidden sm:block relative">
          <Image
            src={image}
            alt="Sign In Illustration"
            layout="intrinsic"
            width={500} // Specify width
            height={500} // Specify height
            className="absolute top-20 md:auto"
          />
        </div>
      </section>
    </div>
  );
}
