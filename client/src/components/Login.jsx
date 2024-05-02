import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/apiSlice";
import { setCredentials } from "../redux/authSlice";
import toast from "react-hot-toast";
function Login({ setLog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(form).unwrap();
      if (response.error) {
        toast.error(response.error);
      } else if (response.success) {
        dispatch(setCredentials({ ...response.user }));
        navigate("/");
        toast.success(response.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-orange-100 rounded-xl p-4 "
    >
      <h3 className="font-montserrat text-xl text-slate-500">Emart Login</h3>
      <input
        onChange={handleChange}
        name="email"
        value={form.email}
        className="border text-gray-500 border-gray-200 outline-none px-2 bg-orange-200 h-8 rounded-md focus:bg-slate-50"
        type="email"
        placeholder="Email..."
      />
      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        className="border text-gray-500 border-gray-200 outline-none px-2 bg-orange-200 h-8 rounded-md focus:bg-slate-50"
        type="password"
        placeholder="Password..."
      />
      <button type="submit" className="bg-green-400 h-8 rounded-md">
        Login
      </button>
      <p>
        No account?
        <Link onClick={() => setLog("Register")} className="text-blue-400">
          Register
        </Link>
      </p>
    </form>
  );
}

export default Login;
