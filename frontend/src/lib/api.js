import axios from "axios";

// Single axios instance for the whole app. `withCredentials` lets the
// browser send/receive the httpOnly refresh-token cookie. The access token
// is attached as a default header by AuthProvider once it is known.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

export default api;
