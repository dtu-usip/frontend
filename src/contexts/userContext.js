import React, { createContext, useState } from "react";
import instance from "../axios";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await instance.post(`/auth`, {
        username,
        password,
      });
      localStorage.setItem("access", response.data?.access);
      localStorage.setItem("refresh", response.data?.refresh);
      localStorage.setItem("user", JSON.stringify(response.data?.user));
      setUser(response.data?.user);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const updatePassword = async (password, newPassword) => {
    try {
      setLoading(true);
      await instance.post(`/auth/password`, {
        password,
        newPassword,
      });
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const updateInfo = async (email, phone) => {
    try {
      setLoading(true);
      await instance.post(`/auth/info`, {
        email,
        phone,
      });
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const refreshToken = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/auth/refreshToken`);
      localStorage.setItem("access", response.data?.access);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await instance.get(`/auth`);
      localStorage.clear("access");
      localStorage.clear("refresh");
      localStorage.clear("user");
      setUser(null);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        login,
        updatePassword,
        updateInfo,
        refreshToken,
        logout,
        user,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};