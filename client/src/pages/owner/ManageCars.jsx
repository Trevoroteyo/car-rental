import { assets } from "@/assets/assets";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { getCars } from "@/services";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

const ManageCars = () => {
  const { carData, setCarData } = useContext(AppContext);
  const { auth } = useContext(AuthContext);

  console.log(auth, "auth");

  async function fecthCarData() {
    const response = await getCars(auth?.user?._id);

    console.log(response, "carData");

    if (response.success) {
      setCarData(response.data);
    } else {
      toast.error("You have not uploaded any cars!");
    }
  }

  useEffect(() => {
    fecthCarData();
  }, []);

  return (
    <div className="flex flex-col gap-8 mb-20 mx-4">
      {/* Title */}
      <div className="flex flex-col">
        <h1 className="font-semibold md:text-3xl sm:text-2xl text-xl ">
          Manage Cars
        </h1>
        <p className="text-gray-400">
          View all listed cars, update their details, or remove them from the
          booking platform.
        </p>
      </div>
      {/* Content */}

      <Table className="border border-gray-300 rounded-lg p-4">
        <TableHeader>
          <TableRow className="text-gray-500 border-gray-300 p-4">
            <TableHead>Car</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="p-4">
          {carData.map((booking) => (
            <TableRow key={booking._id} className="border-gray-300">
              <TableCell className="p-4">
                <div className="flex flex-row gap-2">
                  {booking?.images.map((image) => (
                    <img
                      src={image}
                      className="h-10 w-10 rounded-sm object-cover"
                    />
                  ))}

                  <div className="flex flex-col ">
                    <p className="font-semibold">
                      {" "}
                      {booking.brand} {booking.model}
                    </p>
                    <div className="flex flex-row text-sm text-gray-400 gap-1">
                      <p>{booking.seating_capacity} seats</p>
                      <p>{booking.transmission}</p>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{booking.category}</TableCell>
              <TableCell>{booking.pricePerDay}/day</TableCell>
              <TableCell>
                <Badge className="border text-green-600 bg-green-200">{booking.isAvailable ? "Available": "NotAvailable"}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-row gap-2">
                  <img src={assets.eye_icon} alt="eye_icon" />
                  <img src={assets.delete_icon} alt="delete_icon" />
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* Repeat TableRow for more cars */}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageCars;
