import { Link } from "react-router-dom";
import { clearCredentials } from "../redux/authSlice";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/apiSlice";
import toast from "react-hot-toast";

function Sidemenu({ nav, setNav, userInfo }) {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await logout();
    if (res.data.success) {
      toast.success(res.data.success);
      dispatch(clearCredentials());
    }
    setNav(false);
  };
  return (
    <div
      className=" fixed z-30 w-[300px] right-0 
  bg-slate-100 top-[48px] bottom-0 text-gray-500 text-sm flex flex-col gap-5 items-center p-3"
    >
      <div className="cursor-pointer" onClick={() => setNav(!nav)}>
        <IoClose size={28} />
      </div>

      {userInfo ? (
        <>
          <Link to={"/profile"}>{userInfo.username}</Link>
          {userInfo.isAdmin && <Link to={"/admin"}>Admin panel</Link>}
        </>
      ) : (
        <Link to={"/auth"}>Sign in</Link>
      )}
      <Link to={"/products"}>Products</Link>
      {userInfo && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default Sidemenu;
