import { assets } from "@/assets/assets";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const ManageBookings = () => {
  const { myBookings } = useContext(AppContext);

   
  return (
    <div className="flex flex-col gap-8 mb-20 mx-4">
      {/* Title */}
      <div className="flex flex-col ">
        <h1 className="font-semibold md:text-3xl sm:text-2xl text-xl ">
          Manage Bookings
        </h1>
        <p className="text-gray-400">
          Track all customer bookings, approve or cancel requests, and manage
          booking statuses.
        </p>
      </div>

      <Table className="border border-gray-300 rounded-lg p-4">
        <TableHeader className="p-4">
          <TableRow className="text-gray-500 border-gray-300 p-4">
            <TableHead>Car</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="p-4">
          {myBookings.length > 0 ? (
            myBookings.map((booking) => (
              <TableRow
                key={booking.car._id}
                className="border-gray-300 rounded-lg"
              >
                <TableCell className="p-4">
                  <div className="flex flex-row items-center gap-3">
                    <img
                      src={booking.car.image}
                      className="h-10 w-10 rounded-sm object-cover"
                    />

                    <div className="flex ">
                      <p className="font-semibold">
                        {" "}
                        {booking.car.brand} {booking.car.model}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {booking.pickupDate.split("T")[0]} to{" "}
                  {booking.returnDate.split("T")[0]}
                </TableCell>
                <TableCell>{booking.pricePerDay}/day</TableCell>
                <TableCell>
                  <Badge>{booking.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <img src={assets.eye_icon} alt="eye_icon" />
                    <img src={assets.delete_icon} alt="delete_icon" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <h2 className="text-lg">You currently have no bookings</h2>
          )}

          {/* Repeat TableRow for more bookings */}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageBookings;
