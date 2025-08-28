import Car from "../../models/Car.js";
import Booking from "../../models/Booking.js";
import cloudinary from "../../helpers/cloudinary.js";

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }

    // Upload all images in parallel
    const uploadPromises = req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "cars" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          stream.end(file.buffer);
        })
    );

    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: imageUrls,
    });
  } catch (error) {
    console.error(`Error uploading images: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
    });
  }
};

/**
 * Add car with pre-uploaded image URLs
 */
const addNewCar = async (req, res) => {
  try {
    const {
      userId,
      brand,
      model,
      year,
      category,
      seating_capacity,
      fuel_type,
      transmission,
      pricePerDay,
      location,
      description,
      images, // now comes from frontend as array of URLs
    } = req.body;

    if (
      (brand ||
        model ||
        year ||
        category ||
        seating_capacity ||
        fuel_type ||
        transmission ||
        pricePerDay ||
        location ||
        description ||
        userId) === "" &&
      Array.isArray(images) &&
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing car info.",
      });
    }

    const newCar = new Car({
      owner: userId,
      brand,
      model,
      images: images || [], // ✅ use URLs passed from uploadImages
      year,
      category,
      seating_capacity,
      fuel_type,
      transmission,
      pricePerDay,
      location,
      description,
    });

    await newCar.save();

    res.status(200).json({
      success: true,
      message: "Car added successfully",
      data: newCar,
    });
  } catch (error) {
    console.error(`Error adding new car: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

/**
 * Search cars
 */
const carSearch = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    if ((location || pickupDate || returnDate) === "") {
      return res.json({
        success: false,
        message: "Search parameters are required ",
      });
    }

    const cars = await Car.find({ location });

    if (cars || cars.length === 0) {
      return res.json({
        success: false,
        message: "There are no available cars. Please try again later",
      });
    }

    res.status(200).json({
      success: true,
      message: "Found cars",
      data: cars,
    });
  } catch (error) {
    console.log(`Error in car search: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

const getCars = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.json({
        success: false,
        message: "Invalid User Id",
      });
    }
    const cars = await Car.find({
      owner: userId,
    });

    if (!cars || cars.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No cars available!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Cars fetched successfully",
      data: cars,
    });
  } catch (error) {
    console.log(`Error getting cars: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});

    if (!cars) {
      return res.json({
        success: false,
        message: "No cars found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "All cars fetched successfully",
      data: cars,
    });
  } catch (error) {
    console.log(`Error fetching all cars:${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const getCarDetails = async (req, res) => {
  try {
    const { carId } = req.params;
    if (!carId) {
      res.json({
        success: false,
        message: "Please provide the carId",
      });
    }
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car with the carId not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Car found",
      data: car,
    });
  } catch (err) {
    console.log(`Error fetching all cars:${err}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export {
  addNewCar,
  carSearch,
  uploadImages,
  getCars,
  getAllCars,
  getCarDetails,
};
