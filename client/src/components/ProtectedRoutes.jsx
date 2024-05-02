import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to={"/auth"} replace />;
}

export default ProtectedRoutes;
