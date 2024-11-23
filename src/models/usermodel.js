import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpriy: Date,
});

// Corrected line:
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;


// name changed from userModel to usermodel