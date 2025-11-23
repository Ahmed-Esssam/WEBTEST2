"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "../api/axios";

interface User {
  name: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ accessToken: null, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب auth من localStorage عند أول تحميل
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setAuth(parsed);
      } catch {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // حفظ auth في localStorage
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Hook لتحديث الـ accessToken من السيرفر
export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const res = await axios.get("/auth/refresh", { withCredentials: true });
      const newToken = res.data.accessToken || res.data.token;
      if (!newToken) {
        setAuth({ accessToken: null, user: null });
        return null;
      }

      setAuth({
        accessToken: newToken,
        user: res.data.data?.user ?? null,
      });

      return newToken;
    } catch {
      setAuth({ accessToken: null, user: null });
      return null;
    }
  };

  return refresh;
};

export default AuthContext;
