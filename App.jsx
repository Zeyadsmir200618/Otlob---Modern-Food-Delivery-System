import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import UserProfile from "./pages/UserProfile";
// ⭐ NEW PAGES
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Orders from "./pages/Orders"; // 🔥 ADDED: Import the new Orders page

// 🍗 RESTAURANTS 
import KFC from "./pages/KFC";
import PizzaHut from "./pages/PizzaHat";
import Burgerking from "./pages/BurgerKing";
import McDonalds from "./pages/McDonald's";
import Cart from "./pages/Cart";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/"
        element={
          currentUser?.role?.toLowerCase() === "admin" ? (
            <Navigate to="/admin" replace />
          ) : currentUser ? (
            <Navigate to="/customer" replace />
          ) : (
            <Login setUser={handleLogin} />
          )
        }
      />

      {/* REGISTER */}
      <Route path="/register" element={<Register />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          currentUser?.role?.toLowerCase() === "admin" ? (
            <AdminDashboard user={currentUser} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* CUSTOMER */}
      <Route
        path="/customer"
        element={
          currentUser ? (
            <CustomerDashboard user={currentUser} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* 🍗 RESTAURANT ROUTES */}
      <Route path="/KFC" element={<KFC />} />
      <Route path="/pizzahat" element={<PizzaHut />} />
      <Route path="/BurgerKing" element={<Burgerking />} />
      <Route path="/McDonald's" element={<McDonalds />} />

      {/* ⭐ UTILITY ROUTES */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/cart" element={<Cart />} />

      <Route 
        path="/profile" 
        element={currentUser ? <UserProfile /> : <Navigate to="/" replace />} 
      />
      
      {/* 🔥 ADDED: New Route for the Orders History Page */}
      <Route 
        path="/orders" 
        element={currentUser ? <Orders /> : <Navigate to="/" replace />} 
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;