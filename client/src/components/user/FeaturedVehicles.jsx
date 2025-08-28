import React, { useContext } from "react";
import { Button } from "../ui/button";
import { assets } from "@/assets/assets";
import CarCard from "./CarCard";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const FeaturedVehicles = () => {
  const { allCars, handleCarDetails } = useContext(AppContext);
  const navigate = useNavigate()
  
  return (
    <div className="flex flex-col items-center justify-center container mt-18 md:mx-20 mx-16">
      <h2 className="md:text-4xl text-2xl sm:text-3xl font-semibold mb-4">
        Featured Vehicles
      </h2>
      <p className="mx-16 flex items-center justify-center">
        Explore our selection of premium vehicles available for your next
        adventure
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allCars.length > 0 ? (
          allCars.map((carItem, index) => (
            <CarCard
              car={carItem}
              key={index}
              handleClick={() => handleCarDetails(carItem._id)}
            />
          ))
        ) : (
          <h2>No cars found!</h2>
        )}
      </div>

      <Button
        variant="outline"
        className="mt-20 border-gray-400 text-base px-5 py-2 gap-2 cursor-pointer"
        onClick={()=> navigate("/car-search")}
      >
        Explore All cars
        <span>
          <img src={assets.arrow_icon} />
        </span>
      </Button>
    </div>
  );
};

export default FeaturedVehicles;
