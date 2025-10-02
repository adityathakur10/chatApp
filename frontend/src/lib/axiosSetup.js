import axios from "axios";

// Initialize a global response interceptor to handle 401s (expired/invalid JWT)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try { localStorage.removeItem("chat-user"); } catch {}
      // Force navigation to login; ProtectedRoutes will also block on refresh
      if (typeof window !== "undefined") {
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

// No default export needed; importing this file once sets up interceptors.

