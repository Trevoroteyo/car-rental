import express from "express";
import {
  addNewCar,
  carSearch,
  getCars,
  uploadImages,
  getAllCars,
  getCarDetails,
} from "../controllers/owner/carController.js";
import upload from "../middleware/multer.js"; // multer setup

const router = express.Router();

router.post("/upload-images", upload.array("images", 5), uploadImages); // upload only
router.post("/add-new-car/:userId", addNewCar); // now accepts JSON payload with image URLs
router.post("/car-search", carSearch);
router.get("/get-cars/:userId", getCars);
router.get("/get-all-cars", getAllCars);
router.get("/get-car-details/:carId", getCarDetails);

export default router;
