import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  //destructuring register form values from request body
  const { username, email, password } = req.body;
  // checking for all form values
  if (!username || !email || !password) {
    return res.json({ error: "Fill all fields" });
  }
  //checking for user already existing with email or username
  const userwithemail = await userModel.findOne({ email });
  const userwithusername = await userModel.findOne({ username });
  if (userwithemail) {
    return res.json({ error: "This email is already registered" });
  } else if (userwithusername) {
    return res.json({ error: "This username is taken" });
  }

  // hashing password to save in the database

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  // save new user to database
  await newUser.save();

  res.json({ success: "User registered successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ error: "Fill all fields" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ error: "No user found with this email" });
  }
  const verified = await bcrypt.compare(password, user.password);
  if (!verified) {
    return res.json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET);
  res.cookie("token", token, {
    sameSite: "none",
    secure: true,
  });

  res.json({
    success: "User logged in",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: "Logged out" });
};

export const getProfile = async (req, res) => {
  if (!req.user) {
    return res.json({ error: "Not authenticated" });
  }
  const user = await userModel.findById(req.user._id);
  return res.json(user);
};
