import React, { createContext, useEffect, useState } from "react";
import instance from "../axios";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const localUser = localStorage.getItem("user");

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await instance.post(`/auth`, {
        username,
        password,
      });
      localStorage.setItem("access", response?.data?.access);
      localStorage.setItem("refresh", response?.data?.refresh);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e?.response?.data ?? e);
      setLoading(false);
    }
  };

  const updatePassword = async (password, newPassword) => {
    try {
      setLoading(true);
      await instance.post(`/auth/password`, {
        password,
        newPassword,
      });
      alert("Password Updated!");
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e?.response?.data ?? e);
      setLoading(false);
      alert(
        "There was an error: " +
          (e.response?.data?.err?.message ?? e?.response?.data ?? e).toString()
      );
    }
  };

  const updateInfo = async (email, phone) => {
    try {
      setLoading(true);
      await instance.post(`/auth/info`, {
        email,
        phone,
      });
      alert("Info Updated!");
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e?.response?.data ?? e);
      setLoading(false);
      alert(
        "There was an error: " +
          (e.response?.data?.err?.message ?? e?.response?.data ?? e).toString()
      );
    }
  };

  const refreshToken = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/auth/refreshToken`);
      localStorage.setItem("access", response.data?.access);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e?.response?.data ?? e);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await instance.get(`/auth`);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e?.response?.data ?? e);
    }
    localStorage.clear("access");
    localStorage.clear("refresh");
    localStorage.clear("user");
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, [localUser]);

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
