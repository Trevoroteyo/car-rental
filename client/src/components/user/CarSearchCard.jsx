import React, { useContext, useState } from "react";
import { SearchIcon } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import { initialCarSearchParams } from "@/config";
import { useNavigate } from "react-router-dom";
import { carSearch } from "@/services";
import { toast } from "sonner";

const CarSearchCard = () => {
  const [formData, setFormData] = useState(initialCarSearchParams);
  const { setCarData } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleSearchFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const searchParams = Object.fromEntries(data.entries());

    setFormData(searchParams); // update state for UI
    const response = await carSearch(formData); // ✅ use fresh values

    console.log(response, "response");

    if (response.success) {
      setCarData(response.data);
      navigate("/car-search");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
      <div className="border border-gray-300 py-5 sm:px-12 sm:px-10 bg-white shadow-lg sm:rounded-full rounded-lg sm:w-full max-w-3xl">
        <form
          className="hidden sm:flex flex-row items-center md:gap-6 gap-3 "
          onSubmit={handleSearchFormSubmit}
        >
          <select name="location" id="location" className="">
            <option value="" disabled selected>
              Pickup Location
            </option>
            <option value="newyork">New York</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>

          <div>
            <p>Pickup Date</p>
            <input type="date" name="pickupDate" />
          </div>
          <div>
            <p>Return Date</p>
            <input type="date" name="returnDate" />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-full flex flex-row gap-2 lg:ml-20 md:ml-16 flex items-center"
          >
            <SearchIcon size={"18"} /> <span className="text-lg">Search</span>
          </button>
        </form>

        <form
          className="sm:hidden flex flex-col items-center justify-center sm:gap-6 px-6 gap-3 "
          onSubmit={handleSearchFormSubmit}
        >
          <select name="location" id="location">
            <option value="" disabled selected>
              Pickup Location
            </option>
            <option value="newyork">New York</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>

          <div>
            <p>Pickup Date</p>
            <input type="date" name="pickupDate" />
          </div>
          <div>
            <p>Return Date</p>
            <input type="date" name="returnDate" />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white sm:px-6 sm:py-3 rounded-full px-5 py-2 flex flex-row gap-2 md:ml-20 mt-4 flex items-center"
          >
            <SearchIcon size={"18"} />{" "}
            <span className="sm:text-lg">Search</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default CarSearchCard;
