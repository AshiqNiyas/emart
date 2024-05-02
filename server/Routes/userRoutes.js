import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} from "../Controllers/userController.js";
import { authenticateUser } from "../Middlewares/Auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", authenticateUser, getProfile);

export default userRouter;
