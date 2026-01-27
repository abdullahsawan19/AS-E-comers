import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import Cart from "./userCompounants/Cart";
import Profile from "./userCompounants/Profile";
import Logout from "./userCompounants/Logout";
import ProductDetails from "./userCompounants/ProductDetails";

export default function Collect() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
    </Routes>
  );
}
