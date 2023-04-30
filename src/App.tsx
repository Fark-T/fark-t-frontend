import Order from "./pages/Order";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import MyOrder from "./pages/MyOrder";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyFark from "./pages/MyFark";
import Layout from "./layouts/PageLayout";
import NewOrder from "./pages/NewOrder";
import Profile from "./pages/Profile";
import axios from "axios";
import ProtectRoute from "./components/ProtectRoute";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
axios.defaults.baseURL = import.meta.env.VITE_APP_API;
function App() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <Layout>
      {isAuthenticated && !isLoading && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/neworder"
          element={
            <ProtectRoute>
              <NewOrder />
            </ProtectRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectRoute>
              <Order />
            </ProtectRoute>
          }
        />
        <Route
          path="/myfark"
          element={
            <ProtectRoute>
              <MyFark />
            </ProtectRoute>
          }
        />
        <Route
          path="/myorder"
          element={
            <ProtectRoute>
              <MyOrder />
            </ProtectRoute>
          }
        />
        <Route

          path="/profile"
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>

          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
