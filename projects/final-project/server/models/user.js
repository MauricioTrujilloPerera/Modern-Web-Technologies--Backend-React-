import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  province: { type: String, required: false },
  profilePic: { type: String, required: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;