import { assets } from "@/assets/assets";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/context/AppContext";
import { ArrowLeft, CheckCheckIcon, CheckCircleIcon } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {AuthContext} from "@/context/AuthContext"
import {bookCar} from "@/services"
import {toast} from "sonner"

const CarDetailsPage = () => {
  const { carDetails, fetchCarDetails } = useContext(AppContext);
  const {auth} = useContext(AuthContext)

  const { carId } = useParams(); // <-- get the param from the URL

   async function handleBookCarSubmit(event){
    event.preventDefault()

    const data = event.target
    const form = new FormData(data)
    let dataForm = Object.fromEntries(form.entries())

    const formData ={...dataForm,
      car: carId,
      user : auth?.user?.userId,
      owner : carDetails?.owner,
      price : carDetails?.pricePerDay,
    }
    
    try {
      const response = await bookCar(formData)
        console.log(response, "res")

        if(response.success){
        toast.success("You have booked the car successfully")
          }
    } catch (error) {
      console.log(error, "Error booking car");
      toast.error("Failed booking car")
    }
  }

  useEffect(() => {
    if (carId) {
      fetchCarDetails(carId);
    }
  }, []);

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between gap-4 p-4 md:mx-24 sm:mx-12 mx-8 mb-32 sm:items-start items-center">
        <div className="w-3/4 flex flex-col ">
          <p className="flex text-gray-500">
            <Link to="" className=" flex flex-row gap-2 items-center">
              <span>
                <ArrowLeft size={"16"} />
              </span>
              Back to all cars
            </Link>
          </p>
          {carDetails.images && carDetails.images.length > 0 && (
            <img
              src={`${carDetails.images[0]}`}
              alt="Car"
              className="rounded-lg w-full h-full object-cover mt-4"
            />
          )}

          <div className="flex flex-col gap-2 mt-4">
            <Label className="font-semibold texl-xl">
              {`${carDetails.brand}${" "}${carDetails.model}`.toUpperCase()}
            </Label>
            <p className="text-gray-400">
              {carDetails.year} - {carDetails.category}
            </p>
            <hr className="text-gray-300 mb-2" />
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
              <div className="px-2 py-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <img src={assets.users_icon} />
                <span className="font-semibold text-sm">
                  {carDetails.seating_capacity} Seats
                </span>
              </div>
              <div className="px-2 py-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <img src={assets.fuel_icon} />
                <span className="font-semibold text-sm">
                  {carDetails.fuel_type}
                </span>
              </div>
              <div className="px-2 py-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <img src={assets.car_icon} />
                <span className="font-semibold text-sm">
                  {carDetails.transmission}
                </span>
              </div>
              <div className="px-2 py-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <img src={assets.location_icon} />
                <span className="font-semibold text-sm">
                  {carDetails.location}
                </span>
              </div>
            </div>

            <Label className="text-lg font-semibold ">Description</Label>
            <p className="text-gray-400 mb-2">{carDetails.description}</p>
            <Label className="text-lg font-semibold">Features</Label>
            <div className="grid grid-cols-2">
              <div className="flex gap-3 items-center">
                <CheckCircleIcon />{" "}
                <span className="text-gray-400">Leather Seats</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircleIcon /> <span>Leather Seats</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircleIcon /> <span>Leather Seats</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircleIcon /> <span>Leather Seats</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-2 mt-8">
          <form className="flex flex-col items-start gap-3 border border-gray-300 p-4 rounded-lg shadow-lg" onSubmit={handleBookCarSubmit}>
            <input
              type="text"
              placeholder={`$${carDetails.pricePerDay} per day`}
              className="border border-gray-500 rounded-lg px-2 py-1"
              disabled
            />
            <Label>Pickup Date</Label>
            <input
              type="date"
              className="border rounded-lg w-full border-gray-500 px-2 py-1"
              name="pickupDate"
            />
            <Label>Return Date</Label>
            <input
              type="date"
              className="border rounded-lg w-full border-gray-500 px-2 py-1"
              name="returnDate"
            />
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-500 rounded-lg px-2 py-1 w-full text-center"
            
            >
              Book Now
            </button>
            <p className="text-sm text-gray-400">
              *No credit card required to reserve*
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default CarDetailsPage;
