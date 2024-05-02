import { addtocart, removefromcart } from "../redux/cartSlice";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
function Productcard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mycart = useSelector((state) => state.cart.cart);
  const cartindex = mycart.findIndex((element) => element._id == product._id);
  const { image, title, price, description, old_price, quantity } = product;

  const handleCart = () => {
    if (cartindex >= 0) {
      if (mycart[cartindex].count >= quantity) {
        return toast.error("No more in stock");
      }
    }
    dispatch(addtocart(product));
  };

  const removeCart = (product) => {
    dispatch(removefromcart(product));
  };

  return (
    <div className="w-[200px] h-max p-2 shadow-lg ">
      <div className="h-[160px] ">
        <img
          onClick={() => navigate(`/products/${product._id}`)}
          src={image}
          className="w-full h-[160px] object-contain cursor-pointer"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-center text-md font-montserrat text-gray-600 truncate">
          {title}
        </p>
        <p className="text-center truncate">{description}</p>
        <div className="flex justify-around">
          <p className="text-center font-semibold">₹{price}</p>
          <p className="text-center line-through text-gray-400">₹{old_price}</p>
        </div>

        <div className="flex justify-between">
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
              className="bg-orange-300 px-2 py-1 rounded-md"
            >
              Add to cart
            </button>
          )}

          <button className="bg-yellow-300 px-2 py-1 rounded-md">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
