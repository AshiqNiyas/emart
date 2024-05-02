import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import firelogo from "../assets/fire_logo.png";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import { useGetAllproductsQuery } from "../redux/apiSlice";
import { IoCartOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import Dropdown from "./Dropdown";
import SearchModal from "./SearchModal";
import Sidecart from "./Sidecart";
import Sidemenu from "./Sidemenu";
function Navbar() {
  const { cartnum } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { data: products, isLoading, isError } = useGetAllproductsQuery();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [nav, setNav] = useState(false);
  const [query, setQuery] = useState("");

  const [cartShow, setCartShow] = useState(false);

  return (
    <div className="h-12 flex  text-orange-400 text-xl font-semibold container mx-auto justify-between items-center px-3 relative">
      <div>
        <Link to={"/"}>e MART</Link>
      </div>
      <div className="h-[80%] flex gap-2 items-center justify-center">
        <input
          className="font-montserrat text-sm  border-2 pl-2 rounded-md outline-none h-[90%] border-gray-300"
          type="text"
          placeholder="search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query ? (
          <SearchModal query={query} products={products} setQuery={setQuery} />
        ) : null}
        {userInfo?.isAdmin ? (
          <Link className="hidden md:flex" to={"/admin"}>
            Admin panel
          </Link>
        ) : null}
      </div>
      <div className="flex gap-4">
        <Link
          to={"/products"}
          className="bg-slate-500 px-2 rounded-md hidden md:block"
        >
          Shop
        </Link>
        <div className="relative">
          <div className="w-4 h-4 bg-red-500 rounded-full flex text-sm items-center justify-center top-[-5px] right-[-5px] p-2  text-slate-50 absolute">
            {cartnum}
          </div>
          <IoCartOutline
            onClick={() => setCartShow(!cartShow)}
            className="cursor-pointer"
            size={28}
          />
          {cartShow && (
            <Sidecart cartShow={cartShow} setCartShow={setCartShow} />
          )}
        </div>
        <div>
          <div className="hidden md:flex">
            {userInfo ? (
              <div
                onClick={() => setMenu(!menu)}
                className="flex gap-1 items-center text-slate-400 relative"
              >
                {menu ? (
                  <Dropdown menu={menu} setMenu={setMenu} userInfo={userInfo} />
                ) : null}
                <button className="">{userInfo.username}</button>
                <div className="text-sm font-bold cursor-pointer">{`v`}</div>
              </div>
            ) : (
              <button onClick={() => navigate("/auth")}>Sign in</button>
            )}
          </div>
          <div className="relative md:hidden" onClick={() => setNav(!nav)}>
            <IoMenuOutline size={28} className="cursor-pointer" />
            {nav ? (
              <Sidemenu nav={nav} setNav={setNav} userInfo={userInfo} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
