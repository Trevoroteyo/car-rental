import { Label } from "@/components/ui/label";
import TestimonialCard from "@/components/user/TestimonialCard";
import React from "react";

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center md:mx-32 mx-16 gap-28 mb-26">
      <div className="flex flex-col items-center">
        <h4 className=" md:text-3xl sm:text-2xl font-semibold text-center mb-4">
          What Our Customers Say
        </h4>
        <p>
          Discover why discerning travelers choose CarRental for their car hire
          around the world
        </p>
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <TestimonialCard key={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Label className="md:text-2xl text-xl">Never Miss A deal!</Label>
        <p>
          Subcribe to get the latest offers, new collections and exclusive
          offers.
        </p>
        <div className="md:max-w-3xl flex flex-row">
          <input
            type="text"
            placeholder="Enter your Email address"
            className="border border-r-0 border-gray-300 rounded-l-md px-4 py-2 "
          />
          <button className="bg-blue-600 text-white px-4 py-2 border border-l-0 rounded-r-md">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
