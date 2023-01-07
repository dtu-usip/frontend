import React, { createContext, useState } from "react";
import instance from "../axios";
export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/teacher/course`);
      setCourses(response.data?.courses);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
      setLoading(false);
    }
  };

  const clearState = () => {
    setError(null);
    setLoading(false);
    setCourses([]);
  };

  return (
    <TeacherContext.Provider
      value={{
        getCourses,
        clearState,
        courses,
        error,
        loading,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
