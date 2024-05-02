import { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [log, setLog] = useState("Login");
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div className="h-[calc(100vh-10rem)] flex justify-center items-center">
      {log == "Login" ? (
        <Login setLog={setLog} />
      ) : (
        <Register setLog={setLog} />
      )}
    </div>
  );
}

export default Auth;
