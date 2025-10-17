import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Campaigns from "./pages/Campaigns";
import Messages from "./pages/Messages";
import { getUser, validateUser, logout } from "./utils/auth";

export default function App() {
  const [user, setUser] = useState(getUser());

  const handleLogin = (email, password) => {
    const loggedInUser = validateUser(email, password);
    if (loggedInUser) setUser(loggedInUser);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/leads" replace />} />
          <Route path="leads" element={<Leads />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
