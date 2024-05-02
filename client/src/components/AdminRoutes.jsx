import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
function AdminRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo.isAdmin ? <Outlet /> : <Navigate to={"/"} replace />;
}

export default AdminRoutes;
