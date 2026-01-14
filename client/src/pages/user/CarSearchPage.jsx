import { assets } from "@/assets/assets";
import CarCard from "@/components/user/CarCard";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";

const CarSearchPage = () => {
  const { allCars, handleCarDetails } = useContext(AppContext);

  window.location("/car-search") && window.scrollTo(0, 0);
  return (
    <div className="flex flex-col ">
      <div className="h-60 bg-blue-100 flex flex-col gap-4 items-center py-12 mt-18">
        <h1 className="font-semibold md:text-3xl text-2xl">Available Cars</h1>
        <p className="text-sm sm:text-base">
          Browse our selection of premium vehicles for your next adventure
        </p>
        <div className="lg:w-xl md:w-md  border border-gray-400 flex flex-row items-center px-3 py-2 bg-white justify-between rounded-full">
          <img src={assets.search_icon} className="cursor-pointer" />
          <input
            type="search"
            placeholder="Search by role, model, or features"
            className="outline-none px-2 w-full"
          />
          <img
            src={assets.filter_icon}
            className="flex justify-end cursor-pointer"
          />
        </div>{" "}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4 md:mx-20 sm:mx-12 mx-8 mb-32 mt-20">
        {allCars.length > 0 ? (
          allCars.map((carItem) => {
            return (
              <CarCard
                car={carItem}
                key={carItem._id}
                handleClick={()=> handleCarDetails(carItem._id)}
              />
            );
          })
        ) : (
          <h2>No Cars found!</h2>
        )}
      </div>
    </div>
  );
};

export default CarSearchPage;
