import { useState, useEffect, useRef, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authService, type UserProfile } from "../../services/authService";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const loadingRef = useRef(false); // ✅ Prevenir múltiples cargas simultáneas

  const loadUserProfile = async () => {
    // ✅ Evitar cargas simultáneas
    if (loadingRef.current) {
      console.log("⏳ Carga de perfil ya en progreso...");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("⚠️ No hay token, saltando carga de perfil");
      setLoading(false);
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);
      setAuthError(null);
      console.log("📡 Cargando perfil...");
      const profile = await authService.getProfile();
      console.log("✅ Perfil cargado:", profile);
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (error: any) {
      console.error("❌ Error cargando perfil:", error);
      // ✅ Si es 401, eliminar token y usuario
      if (error.response?.status === 401) {
        console.warn("⚠️ Token inválido, cerrando sesión");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setAuthError("Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        setAuthError("Error al cargar el perfil. Por favor, intenta de nuevo.");
      }
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  // ✅ useEffect para carga inicial - solo una vez
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    console.log("🔍 AuthProvider init - token:", !!token, "user:", !!savedUser);

    if (token && !savedUser) {
      console.log("📡 Token encontrado, cargando perfil...");
      loadUserProfile();
    } else if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setLoading(false);
        console.log("✅ Usuario restaurado de localStorage");
      } catch {
        setLoading(false);
      }
    } else {
      setLoading(false);
      console.log("ℹ️ No hay sesión activa");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ Solo ejecutar al montar

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setAuthError(null);
      console.log("📡 Intentando login para:", username);

      const response = await authService.login({ username, password });
      console.log(
        "✅ Login exitoso, token:",
        response.token.substring(0, 20) + "...",
      );

      localStorage.setItem("token", response.token);

      // ✅ Cargar perfil después del login
      await loadUserProfile();
      return true;
    } catch (error: any) {
      console.error("❌ Error en login:", error);
      setAuthError(error.response?.data?.error || "Error al iniciar sesión");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("🔴 Cerrando sesión");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setLoading(false);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
        authError, // ✅ Opcional: exponer error para mostrar en UI
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
