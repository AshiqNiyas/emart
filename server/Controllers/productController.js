import productModel from "../Models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});
export const getAllProducts = async (req, res) => {
  const products = await productModel.find({});
  res.json(products);
};

export const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findById({ _id: id });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { title, description, price, old_price, category, brand, image } =
    req.body;
  if (
    !title ||
    !description ||
    !price ||
    !old_price ||
    !category ||
    !image ||
    !brand
  ) {
    return res.json({ error: "Fill all fields" });
  }

  if (image) {
    try {
      const uploadRes = await cloudinary.uploader.upload(image);

      if (uploadRes) {
        const newProduct = await productModel.create({
          title,
          description,
          price,
          old_price,
          category,
          brand,
          image: uploadRes.url,
        });
        await newProduct.save();
        res.json({ success: "Product created" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateProductsById = () => {};

export const deleteProductsById = async (req, res) => {
  const id = req.params.id;
  productModel.findByIdAndDelete({ _id: id });
  res.json({ success: "Product deleted" });
};
