import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeatPassword: Joi.ref("password"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    // Validate inputs (throws if invalid)
    const { error } = registerSchema.validate({
      firstName,
      lastName,
      email,
      password,
      repeatPassword,
    });

    if (error) {
      return res.json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      roles: ["user"],
      image: "",
    });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (e) {
    console.error(`Error during user registration: ${e}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return res.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        roles: user.roles,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      crossSite : true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    crossSite : true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const getProfile = async (req, res) => {
  try {
    const authenticatedUser = await User.findById(req.user.userId).select(
      "-password"
    ); // exclude password

    if (!authenticatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        authenticate: true,
        user: authenticatedUser,
      },
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profile",
    });
  }
};
