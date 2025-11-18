// src/components/ProtectedRoutes.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  loggedIn: boolean;        // AÑADIDO
  children: React.ReactNode; // AÑADIDO
}

export default function ProtectedRoute({ loggedIn, children }: ProtectedRouteProps) {
  return loggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}