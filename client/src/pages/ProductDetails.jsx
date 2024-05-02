import axios from "axios";

import { useGetProductByIdQuery } from "../redux/apiSlice";
import { useParams } from "react-router-dom";
import { addtocart, clearCart, removefromcart } from "../redux/cartSlice";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const mycart = useSelector((state) => state.cart.cart);
  const cartindex = mycart.findIndex((element) => element._id == product?._id);
  const { userInfo } = useSelector((state) => state.auth);
  const { cart, subtotal } = useSelector((state) => state.cart);
  const handleCart = () => {
    if (cartindex >= 0) {
      if (mycart[cartindex].count >= product.quantity) {
        return toast.error("No more in stock");
      }
    }
    dispatch(addtocart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const checkout = async () => {
    if (!mycart.length) {
      return toast.error("Cart is empty");
    }
    if (!userInfo) {
      return toast.error("Login to continue");
    }
    const response = await axios.post(
      "http://localhost:3001/checkout",
      { cart },
      {
        withCredentials: true,
      }
    );
    if (!response?.data.url) {
      return response.json("Error");
    }
    window.location.href = await response.data.url;
    handleClearCart();
  };

  const removeCart = (product) => {
    dispatch(removefromcart(product));
  };
  return (
    <div className="max-w-[1240px] mx-auto min-h-screen flex flex-col md:flex-row gap-10 ">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          Loading ...
        </div>
      ) : (
        <>
          <div className="left flex gap-10 justify-center items-center flex-col-reverse md:flex-row flex-1">
            <div className="flex gap-2 justify-center items-center md:flex-col">
              <img
                src={product.image}
                className="w-32 px-2 outline outline-gray-300"
                alt=""
              />
              <img
                src={product.image}
                className="w-32 px-2 outline outline-gray-300 "
                alt=""
              />
              <img
                src={product.image}
                className="w-32 px-2  outline outline-gray-300 border"
                alt=""
              />
            </div>
            <div className="flex justify-center items-center">
              <img src={product.image} className="w-60" alt="" />
            </div>
          </div>
          <div className="right flex-1 flex flex-col justify-center gap-8 items-center">
            <div className="text-xl text-gray-800">{product.title}</div>
            <div className="text-gray-500 max-w-[80%] mx-auto">
              {product.description}
            </div>
            <div className="font-bold">₹{product.price}</div>
            <div className="flex items-center gap-3">
              {cartindex >= 0 && mycart[cartindex].count > 0 ? (
                <div className="flex gap-2">
                  <CiSquareMinus
                    onClick={() => removeCart(product)}
                    size={24}
                    className="cursor-pointer"
                  />
                  {mycart[cartindex].count}
                  <CiSquarePlus
                    onClick={() => handleCart(product)}
                    size={24}
                    className="cursor-pointer"
                  />
                </div>
              ) : (
                <button
                  onClick={() => handleCart(product)}
                  className="bg-orange-300 px-3 py-2 rounded-md hover:bg-orange-400"
                >
                  Add to cart
                </button>
              )}
              <button
                onClick={checkout}
                className="bg-orange-500 rounded-md hover:bg-orange-600 text-white  px-3 py-2 "
              >
                Checkout
              </button>
            </div>
          </div>
          <div></div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
