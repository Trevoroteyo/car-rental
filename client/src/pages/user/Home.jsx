import Banner from "@/components/user/Banner";
import FeaturedVehicles from "@/components/user/FeaturedVehicles";
import Hero from "@/components/user/Hero";
import React from "react";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen items-center ">
      <Hero />
      <FeaturedVehicles />
      <Banner />
      <Testimonials />
    </div>
  );
};

export default Home;
