import express from "express";
import {
  bookCar,
  myBookings,
} from "../controllers/owner/bookingsController.js";

const router = express.Router();

router.post("/book-car", bookCar);
router.get("/get-my-bookings/:userId", myBookings);

export default router;
