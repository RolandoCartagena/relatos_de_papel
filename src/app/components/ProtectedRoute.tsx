import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Guardamos la ruta a la que quería ir para devolverlo ahí después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Si está logueado, muestra la ruta hija
}
