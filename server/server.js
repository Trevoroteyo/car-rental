import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js"
import userRoutes  from "./routes/userRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/car", carRoutes)
app.use("/api/user", userRoutes)
app.use("/api/booking", bookingRoutes)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Mongodb connected successfully");
    app.listen(PORT, () => console.log(`App is now running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    console.log(`Error:${err} `);
  });
