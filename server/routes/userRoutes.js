import express from "express";
import { updateUserRole } from "../controllers/user/userController.js";

const router = express.Router();

router.put('/become-owner/:userId', updateUserRole);

export default router;
