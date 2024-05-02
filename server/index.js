import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://checkout.stripe.com",
      "https://emart-eight.vercel.app",
    ],
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true,
  })
);

app.use("/users", userRouter);
app.use("/products", productRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });
});

// image upload engine

// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

// app.use("/images", express.static("upload/images"));

// app.post("/upload", upload.single("product"), (req, res) => {
//   try {
//     res.json({
//       success: 1,
//       image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//cloudinary

// stripe integration
const stripe = new Stripe(process.env.STRIPE);

app.post("/checkout", async (req, res) => {
  const line_items = req.body.cart?.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.image[0]],
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.count,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["IN", "US"],
    },
    line_items: line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });
  res.send({ url: session.url });
});
