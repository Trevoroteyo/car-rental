import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    images: { type: [String] },
    year: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "SUV",
        "Sedan",
        "Coupe",
        "Hatchback",
        "Truck",
        "SuperCar",
        "HyperCar",
      ],
      required: true,
    },
    seating_capacity: { type: Number, required: true },
    fuel_type: {
      type: String,
      enum: ["Petrol", "Diesel", "Hybrid", "Electric"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic", "Semi-Automatic"],
      required: true,
    },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
