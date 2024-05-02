import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import AdminRoutes from "./components/AdminRoutes";
import AdminPanel from "./pages/AdminPanel";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="" element={<ProtectedRoutes />}>
            <Route path="" element={<AdminRoutes />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
