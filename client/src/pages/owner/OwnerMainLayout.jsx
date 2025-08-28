import Navbar from "@/components/owner/Navbar";
import Sidebar from "@/components/owner/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const OwnerMainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />
      <div className="flex flex-1 h-full">
        {/* Sidebar */}
        <div className="md:w-64 w-16 bg-white border-r shadow-r-sm border-b-0 border-gray-200 ">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <footer className="bg-gray-800 text-white p-4 text-center mt-60">
        <p>
          &copy; {new Date().getFullYear()} Car Rental. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default OwnerMainLayout;
