import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllCars, getCarDetails, getMyBookings } from "@/services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [carData, setCarData] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [carDetails, setCarDetails] = useState({});

  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState([]);
  const { auth } = useContext(AuthContext);

  async function fetchMyBookings() {
    const response = await getMyBookings(auth?.user?._id);
    if (response.success) {
      setMyBookings(response.data);
    }
  }

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

  function handleCarDetails(getCarId) {
    fetchCarDetails(getCarId);
    navigate(`/car-details/${getCarId}`);
    scrollTo(0, 0, { behaviour: "smooth" });
  }

  useEffect(() => {
    fetchAllCars();
  }, []);

  useEffect(() => {
    fetchMyBookings();
  }, []);
  return (
    <AppContext.Provider
      value={{
        carData,
        setCarData,
        allCars,
        fetchCarDetails,
        handleCarDetails,
        carDetails,
        myBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
