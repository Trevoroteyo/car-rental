import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { assets } from "@/assets/assets";

const BookingCard = ({ car }) => {
  return (
    <Card className="w-full border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="flex flex-col items-center sm:flex-row">
        <div className="flex flex-col items-start md:p-4 p-2 gap-2">
          <img
            src={`${car?.car.images?.length > 0 ? car?.car.images[0] : ""}`}
            className="w-76 h-40 rounded-lg object-cover"
          />
          <div className="flex flex-col items-start">
            <Label className="font-semibold text-lg">{`${
              car?.car.brand
            } ${" "} ${car?.car.model}`}</Label>
            <p className="text-gray-400 text-sm">{`${
              car?.car.category
            } ${"-"} ${car?.car.year}`}</p>
          </div>
        </div>
        <div className="flex flex-row gap-8 md:gap-16 lg:gap-24 xl:gap-32">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-row gap-2">
              <Badge className="text-gray-900 bg-gray-400 font-semibold text-sm">
                Booking #1
              </Badge>
              <Badge className="text-green-300 bg-green-100 font-semibold text-sm">
                confirmed
              </Badge>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row gap-2">
                <img
                  src={assets.calendar_icon_colored}
                  alt="calendar_icon_colored"
                />{" "}
                <span className="text-gray-400">Rental Period</span>
              </div>
              <p className="font-semibold pl-6">{`${
                car.pickupDate.split("T")[0]
              } ${"-"} ${car.returnDate.split("T")[0]}`}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row gap-2">
                <img
                  src={assets.location_icon_colored}
                  alt="location_icon_colored"
                />
                <span className="text-gray-400">Pickup-up Location</span>
              </div>
              <p className="font-semibold pl-6">Airport Terminal 1</p>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row gap-2">
                <img
                  src={assets.location_icon_colored}
                  alt="location_icon_colored"
                />
                <span className="text-gray-400">Return Location</span>
              </div>
              <p className="font-semibold pl-6">Downtown Office</p>
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <span className="text-gray-400">Total Price</span>
            <span className="font-semibold text-2xl text-blue-600">{`$${car.price}`}</span>
            <p>Booked on 4/1/2025</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
