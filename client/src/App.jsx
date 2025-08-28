import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/user/Layout";
import Home from "./pages/user/Home";
import CarDetailsPage from "./pages/user/CarDetailsPage";
import CarBookingPage from "./pages/user/CarBookingPage";
import CarSearchPage from "./pages/user/CarSearchPage";
import MyBookings from "./pages/user/MyBookings";
import OwnerMainLayout from "./pages/owner/OwnerMainLayout";
import Dashboard from "./pages/owner/Dashboard";
import AddNewCarPage from "./pages/owner/AddNewCarPage";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookingsPage";
import RouteGuard from "./pages/auth/index"; // ✅ import guard

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="car-details/:carId" element={<CarDetailsPage />} />
        <Route path="book-car" element={<CarBookingPage />} />
        <Route path="car-search" element={<CarSearchPage />} />
        <Route
          path="my-bookings"
          element={
            <RouteGuard>
              <MyBookings />
            </RouteGuard>
          }
        />
      </Route>

      {/* Owner-only routes */}
      <Route
        path="/owner"
        element={
          <RouteGuard roles={["owner", "admin"]}>
            <OwnerMainLayout />
          </RouteGuard>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-car" element={<AddNewCarPage />} />
        <Route path="manage-cars" element={<ManageCars />} />
        <Route path="manage-bookings" element={<ManageBookings />} />
      </Route>
    </Routes>
  );
};

export default App;
