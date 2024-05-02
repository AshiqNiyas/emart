import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ error: "Not authenticated" });
  }
  const verified = jwt.verify(token, process.env.SECRET);
  if (!verified) {
    return res.json({ error: "Invalid token" });
  }
  const user = await userModel.findById(verified.userId);
  if (user) {
    user.password = undefined;
    req.user = user;
    return next();
  }
  res.json({ error: "User not found" });
};

export const authorizeUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.json({ error: "Not authorized" });
  }
  return next();
};
