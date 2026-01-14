import BookingCard from "@/components/user/BookingCard";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect } from "react";
import { getMyBookings } from "@/services";
import { AppContext } from "@/context/AppContext";

const MyBookings = () => {
  const { myBookings, fetchMyBookings } = useContext(AppContext);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="flex flex-col items-start min-h-screen gap-1 md:mx-20 sm:mx-10 mx-6">
      <h1 className="font-semibold md:text-3xl sm:text-2xl text-xl mt-16">
        My Bookings
      </h1>
      <p className="text-sm sm:text-base text-gray-400 mb-5">
        View and Manage your car bookings
      </p>
      <div className="grid grid-cols-1 gap-8 mb-100">
        {myBookings.length > 0 ? (
          myBookings.map((booking) => {
            return (
              <div key={booking._id} className="mb-6">
                <BookingCard car={booking} />
              </div>
            );
          })
        ) : (
          <h2>You have not booked any car.</h2>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
