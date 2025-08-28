import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { assets } from "@/assets/assets";
import { Badge } from "../ui/badge";

const CarCard = ({ car, handleClick }) => {

  return (
    <Card className="p-0 border-none shadow-lg cursor-pointer hover:shadow-xl">
      <CardContent className="p-0 border-none " onClick={handleClick}>
        <div className="relative">
          {car.isAvaliable && (
            <Badge
              asChild
              className="absolute top-3 left-3 bg-blue-600 text-white rounded-full px-3 py-1"
            >
              <span>Available Now</span>
            </Badge>
          )}
          <img
            src={`${car.images[0]}`}
            className="rounded-t-xl w-full h-48 object-cover"
            alt={`${car.brand} ${car.model}`}
          />
          <Badge
            asChild
            className="absolute bottom-3 right-3 bg-gray-900 text-white px-3 py-1"
          >
            <span>${car.pricePerDay}/day</span>
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pb-6">
        <div className="flex flex-col items-start">
          <p className="text-lg font-semibold">
            {car.brand} {car.model}
          </p>
          <p className="text-gray-500">
            {car.category} {car.year}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <span className="flex text-sm text-gray-600 items-center gap-2">
                <img src={assets.users_icon} alt="Seats" />
                {car.seating_capacity} Seats
              </span>
              <span className="flex text-sm text-gray-600 items-center gap-2">
                <img src={assets.car_icon} alt="Transmission" />
                {car.transmission}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="flex text-sm text-gray-600 items-center gap-2">
                <img src={assets.fuel_icon} alt="Fuel" />
                {car.fuel_type}
              </span>
              <span className="flex text-sm text-gray-600 items-center gap-2">
                <img src={assets.location_icon_colored} alt="Location" />
                {car.location}
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
