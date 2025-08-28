import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { assets } from "@/assets/assets";
import { Badge } from "../ui/badge";

const CarCard2 = () => {
  return (
    <Card className="p-0 border-none shadow-lg">
      <CardContent className="p-0  border-none">
        <div className="relative">
          <Badge
            asChild
            className="absolute top-3 left-3 bg-blue-600 text-white rounded-full px-3 py-1"
          >
            <span>Available Now</span>
          </Badge>
          <img src={assets.car_image1} className="rounded-t-xl h-full w-78" />
          <Badge
            asChild
            className="absolute bottom-3 right-3 bg-gray-900 text-white px-3 py-1"
          >
            <span>$100/day</span>
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pb-6">
        <div className="flex flex-col items-start">
          <p className="text-lg font-semibold">BMW X5</p>
          <p className="text-gray-500">SUV 2022 </p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <span className="flex text-sm text-gray-600 items-center gap-2">
                <img src={assets.users_icon} />5 Seats
              </span>
              <span className="flex text-sm text-gray-600 items-center gap-2">
                <img src={assets.car_icon} />
                Automatic
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="flex text-sm text-gray-600 items-center gap-2">
                <img src={assets.fuel_icon} />
                Gasoline
              </span>
              <span className="flex text-sm text-gray-600 items-center gap-2">
                <img src={assets.location_icon_colored} />
                Los Angeles
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard2;
