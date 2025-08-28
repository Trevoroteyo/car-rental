import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* All pages will be injected here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
