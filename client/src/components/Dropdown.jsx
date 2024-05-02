import { Link } from "react-router-dom";
import { useLogoutMutation } from "../redux/apiSlice";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/authSlice";
function Dropdown({ userInfo, setMenu, menu }) {
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await logout().unwrap();
    dispatch(clearCredentials());
    setMenu(!menu);
  };
  return (
    <div className="flex flex-col text-center bg-slate-300 absolute top-[48px] text-gray-500  right-0 border-b-slate-400 px-6 py-3 shadow-lg rounded-lg gap-2">
      <Link
        className="hover:text-slate-50 rounded-md hover:bg-slate-600"
        to={"/profile"}
      >
        profile
      </Link>
      <Link
        className="hover:text-slate-50 rounded-md hover:bg-slate-600"
        to={"/orders"}
      >
        Orders
      </Link>
      <button
        className="hover:bg-red-300 px-2 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dropdown;
