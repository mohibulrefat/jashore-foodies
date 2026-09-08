import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import api from "../lib/api";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessTokenRef = useRef(null);
  const refreshPromiseRef = useRef(null);

  const applyToken = useCallback((token) => {
    accessTokenRef.current = token || null;
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, []);

  const clearSession = useCallback(() => {
    applyToken(null);
    setUser(null);
  }, [applyToken]);

  // De-duplicated silent refresh: concurrent 401s share one request.
  const refresh = useCallback(() => {
    if (!refreshPromiseRef.current) {
      refreshPromiseRef.current = api
        .post("/auth/refresh")
        .then((res) => {
          applyToken(res.data.accessToken);
          return res.data;
        })
        .finally(() => {
          refreshPromiseRef.current = null;
        });
    }
    return refreshPromiseRef.current;
  }, [applyToken]);

  // Restore the session on first load.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await refresh();
        const me = await api.get("/auth/me");
        if (active) setUser(me.data);
      } catch {
        if (active) clearSession();
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [refresh, clearSession]);

  // On 401, refresh once and replay the original request.
  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original = error.config || {};
        const url = original.url || "";
        const isAuthCall = /\/auth\/(refresh|login|register)/.test(url);
        if (error.response?.status === 401 && !original._retry && !isAuthCall) {
          original._retry = true;
          try {
            const data = await refresh();
            original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(original);
          } catch (refreshError) {
            clearSession();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptorId);
  }, [refresh, clearSession]);

  const signIn = useCallback(
    async (email, password) => {
      const res = await api.post("/auth/login", { email, password });
      applyToken(res.data.accessToken);
      setUser(res.data.user);
      return res.data.user;
    },
    [applyToken]
  );

  const register = useCallback(
    async (payload) => {
      const res = await api.post("/auth/register", payload);
      applyToken(res.data.accessToken);
      setUser(res.data.user);
      return res.data.user;
    },
    [applyToken]
  );

  const logOut = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore network errors on logout
    }
    clearSession();
  }, [clearSession]);

  const changePassword = useCallback(
    async (currentPassword, newPassword) => {
      const res = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      applyToken(res.data.accessToken);
      return res.data;
    },
    [applyToken]
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      role: user?.role || null,
      signIn,
      register,
      logOut,
      changePassword,
    }),
    [user, loading, signIn, register, logOut, changePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
