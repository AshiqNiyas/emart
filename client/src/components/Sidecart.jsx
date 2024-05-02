import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Productcard from "./Productcard";
import toast from "react-hot-toast";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";
function Sidecart({ cartShow, setCartShow }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cart, subtotal } = useSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const checkout = async () => {
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
  return (
    <div
      className={`fixed z-30 w-[300px] right-0 
        bg-slate-100 top-[48px] bottom-0 overflow-scroll text-gray-500 text-sm`}
    >
      <div
        className="p-3 cursor-pointer"
        onClick={() => setCartShow(!cartShow)}
      >
        <IoClose size={24} />
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div className="font-montserrat text-xl">
          Subtotal is : Rs {subtotal}
        </div>
        <div className="text-center py-2 px-6 bg-blue-300 text-slate-100">
          {cart?.length ? (
            <Link onClick={checkout}>Checkout</Link>
          ) : (
            <p>Add items to checkout</p>
          )}
        </div>
        {cart?.map((item, i) => {
          return <Productcard key={i} product={item} />;
        })}
      </div>
    </div>
  );
}

export default Sidecart;
