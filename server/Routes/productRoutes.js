import express from "express";
import { authenticateUser, authorizeUser } from "../Middlewares/Auth.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductsById,
  deleteProductsById,
} from "../Controllers/productController.js";
const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", authenticateUser, authorizeUser, createProduct);
productRouter.put("/:id", authenticateUser, authorizeUser, updateProductsById);
productRouter.delete(
  "/:id",
  authenticateUser,
  authorizeUser,
  deleteProductsById
);

export default productRouter;
