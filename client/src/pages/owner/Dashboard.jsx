import { assets, dummyMyBookingsData } from "@/assets/assets";
import { Label } from "@/components/ui/label";
import React, { useContext } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppContext } from "@/context/AppContext";

const Dashboard = () => {
  const { carData } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-8 mb-20">
      {/* Title */}
      <div className="flex flex-col mt-10">
        <h1 className="font-semibold md:text-3xl sm:text-2xl text-xl ">
          Admin Dashboard
        </h1>
        <p className="text-gray-400">
          Monitor overall performance including total cars, bookings, revenue
          and recent activities
        </p>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex flex-row justify-between items-center gap-4 p-4 border border-gray-400 rounded">
          <div className="flex flex-col gap-1 items-center">
            <Label className="text-gray-400">Total Cars</Label>
            <p className="font-semibold text-lg">{carData.length}</p>
          </div>
          <img
            src={assets.carIconColored}
            className="border-none bg-blue-100 rounded-full p-2 h-[38px] w-[38px]"
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-4 p-4 border border-gray-400 rounded">
          <div className="flex flex-col gap-1 items-center">
            <Label className="text-gray-400">Total Bookings</Label>
            <p className="font-semibold text-lg">8</p>
          </div>
          <img
            src={assets.listIconColored}
            className="border-none bg-blue-100 rounded-full p-2 h-[38px] w-[38px]"
          />
        </div>

        <div className="flex flex-row sm:flex-row justify-between items-center gap-4 p-4 border border-gray-400 rounded">
          <div className="flex flex-col gap-1 items-center">
            <Label className="text-gray-400">Pending Bookings</Label>
            <p className="font-semibold text-lg">8</p>
          </div>
          <img
            src={assets.cautionIconColored}
            className="border-none bg-blue-100 rounded-full p-2 h-[38px] w-[38px]"
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-4 p-4 border border-gray-400 rounded">
          <div className="flex flex-col gap-1 items-center">
            <Label className="text-gray-400">Completed Bookings</Label>
            <p className="font-semibold text-lg">8</p>
          </div>
          <img
            src={assets.listIconColored}
            className="border-none bg-blue-100 rounded-full p-2 h-[38px] w-[38px]"
          />
        </div>
      </div>

      {/* Recent Bookings & Monthly Revenue */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Recent Bookings Card */}
        <Card className="p-4 px-6 border border-gray-400 flex-1">
          <CardHeader>
            <CardTitle>
              <p className="text-lg mb-1">Recent Bookings</p>
              <p className="text-gray-400">Latest customer bookings</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dummyMyBookingsData.map((booking, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 border-b border-gray-200 pb-2"
              >
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={assets.listIconColored}
                    className="p-2 bg-blue-100 rounded-full h-10 w-10"
                  />
                  <div className="flex flex-col items-start py-1">
                    <Label className="font-semibold text-base">
                      {`${booking.car.brand} ${booking.car.model}`}
                    </Label>
                    <p className="text-gray-400 text-sm">
                      {(booking.car.createdAt || "").split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <p className="text-gray-400">${booking.price}</p>
                  <Badge>{booking.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Revenue Box */}
        <div className="flex flex-col gap-1 p-4 border border-gray-400 rounded w-full lg:w-64">
          <Label className="font-semibold">Monthly Revenue</Label>
          <p className="text-gray-400 text-sm mb-4">
            Revenue for current month
          </p>
          <p className="text-blue-600 text-2xl font-semibold">$1060</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
