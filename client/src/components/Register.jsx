import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../redux/apiSlice";
import toast from "react-hot-toast";

function Register({ setLog }) {
  const [register, { isLoading, isError }] = useRegisterMutation();
  const [form, setForm] = useState({
    username: "",
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
      const response = await register(form).unwrap();
      if (response.error) {
        toast.error(response.error);
      } else if (response.success) {
        setLog("Login");
        toast.success(response.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-orange-100 rounded-xl p-4 "
      >
        <h3 className="font-montserrat text-xl text-slate-500">
          Emart Register
        </h3>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="border text-gray-500 border-gray-200 outline-none px-2 bg-orange-200 h-8 rounded-md focus:bg-slate-50"
          type="text"
          placeholder="Username..."
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
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
          Register
        </button>
        <p>
          Already have account?
          <Link onClick={() => setLog("Login")} className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
