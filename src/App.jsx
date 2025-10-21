import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Leads from "./pages/Leads";
import Campaigns from "./pages/Campaigns";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const { user } = useAuth();

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard onLogout={handleLogout} />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="leads" element={<Leads />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
