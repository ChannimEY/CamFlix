import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../api/models/auth";
import { getAuthToken, getAuthUser, loginUser, registerUser, getUser, logoutUser, unwrapUser } from "../api/services/authService";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
        const response = await getUser(storedToken);
        setUser(unwrapUser(response));
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    const newToken = getAuthToken(response);
    const newUser = getAuthUser(response);
    if (newToken) {
      await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(newUser);
    }
  };

  const register = async (data: { firstName: string; lastName: string; email: string; password: string; password_confirmation: string }) => {
    const response = await registerUser({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
    const newToken = getAuthToken(response);
    const newUser = getAuthUser(response);
    if (newToken) {
      await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(newUser);
    }
  };

  const logout = async () => {
    if (token) {
      await logoutUser(token);
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (token) {
      const response = await getUser(token);
      setUser(unwrapUser(response));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};