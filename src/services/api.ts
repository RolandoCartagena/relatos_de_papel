import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8762';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 Request:', config.method?.toUpperCase(), config.url, config.headers.Authorization ? '✅ con token' : '❌ sin token');
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Manejar errores 401
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // ✅ Solo eliminar token si NO estamos en login
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    const isProfileRequest = error.config?.url?.includes('/users/profile');
    
    if (error.response?.status === 401 && !isLoginRequest) {
      console.warn('⚠️ 401 detectado en:', error.config?.url);
      // ✅ No eliminar token automáticamente - dejar que AuthProvider maneje
      // Solo redirigir si no estamos ya en login
      if (!window.location.pathname.includes('/login')) {
        // No redirigir inmediatamente - dejar que el componente maneje
        console.warn('⚠️ Sesión expirada - redirigiendo a login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;