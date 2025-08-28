import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // hashed
    roles: {
      type: [String],
      enum: ["user", "owner", "admin"],
      default: ["user"],
    },
    image: { type: String }, // profile picture url
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
