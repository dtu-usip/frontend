import React, { createContext, useState } from "react";
import instance from "../axios";
import gradesList from "../utilities/gradesList";
export const GradeDashboardContext = createContext();

export const GradeDashboardProvider = ({ children }) => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveGrades = async (grades) => {
    try {
      setLoading(true);
      await instance.post(`/grade-dashboard`, JSON.stringify(grades));
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const getGradeDashboard = async (id) => {
    try {
      setLoading(true);
      const response = await instance.get(`/grade-dashboard?id=${id}`);
      if (response.data?.grades) {
        const list = response.data?.grades;
        // sort from O to F
        list.sort((a, b) => b.grade.starts_from - a.grade.starts_from);
        setGrades(list);
      } else {
        setGrades(gradesList);
      }
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const clearState = () => {
    setError(null);
    setLoading(false);
    setGrades([]);
  };

  return (
    <GradeDashboardContext.Provider
      value={{
        saveGrades,
        getGradeDashboard,
        clearState,
        grades,
        error,
        loading,
      }}
    >
      {children}
    </GradeDashboardContext.Provider>
  );
};
