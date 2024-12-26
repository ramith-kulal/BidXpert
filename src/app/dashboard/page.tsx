'use client'
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar"; // Assuming you have a Navbar component

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBids: 0,
    totalMoneySpent: 0,
    totalItemsSold: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          console.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen  bg-gray-900">
        <div className="text-teal-500 bg-gray-900 font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center py-12">
      {/* Navbar Component */}
      <Navbar />

      <div className="mt-10 text-teal-400 mb-6 font-semibold text-3xl">
        <h1>Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Total Bids */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="text-teal-500 text-xl font-semibold">Total Bids</h2>
          <p className="text-3xl font-bold mt-2">{dashboardData.totalBids}</p>
        </div>

        {/* Total Money Spent */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="text-teal-500 text-xl font-semibold">Total Money Spent</h2>
          <p className="text-3xl font-bold mt-2">${dashboardData.totalMoneySpent.toFixed(2)}</p>
        </div>

        {/* Total Items Sold */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="text-teal-500 text-xl font-semibold">Total Items Sold</h2>
          <p className="text-3xl font-bold mt-2">{dashboardData.totalItemsSold}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
