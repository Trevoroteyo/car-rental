import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllCars, getCarDetails, getMyBookings } from "@/services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [carData, setCarData] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [carDetails, setCarDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState([]);
  const { auth } = useContext(AuthContext);

  async function fetchAllCars() {
    const response = await getAllCars();
    if (response.success) {
      setAllCars(response.data);
    }
  }

  async function fetchCarDetails(getCarId) {
    const response = await getCarDetails(getCarId);

    if (response.success) {
      setCarDetails(response.data);
    }
  }

  async function fetchMyBookings() {
    const response = await getMyBookings(auth?.user?._id);
    if (!response.success) return;

    // Fetch car details for each booking
    const bookingsWithCars = await Promise.all(
      response.data.map(async (booking) => {
        const carRes = await getCarDetails(booking.car);

        return {
          ...booking,
          car: carRes.success ? carRes.data : null,
        };
      })
    );

    setMyBookings(bookingsWithCars);
  }

  function handleCarDetails(getCarId) {
    fetchCarDetails(getCarId);
    navigate(`/car-details/${getCarId}`);
    scrollTo(0, 0, { behaviour: "smooth" });
  }

  useEffect(() => {
    fetchAllCars();
  }, []);

  useEffect(() => {
    if (auth?.user?._id) {
      fetchMyBookings();
    }
  }, [auth?.user?._id]);

  return (
    <AppContext.Provider
      value={{
        carData,
        setCarData,
        allCars,
        fetchMyBookings,
        fetchCarDetails,
        handleCarDetails,
        carDetails,
        myBookings,
        loading,
        setLoading,
        setMyBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
