// src/app.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import DashboardPage from "./pages/dashboardPage";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/users/profile", { withCredentials: true });
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
        <p className="text-xl font-semibold text-blue-600">Cargando...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={loggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage setLoggedIn={setLoggedIn} />}
      />
      <Route
        path="/register"
        element={loggedIn ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <DashboardPage setLoggedIn={setLoggedIn} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;