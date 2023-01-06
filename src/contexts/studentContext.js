import React, { createContext, useState } from "react";
import instance from "../axios";
export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStudentList = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/student`);
      setStudents(response.data?.students);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const getStudentsInCourse = async (course_id) => {
    try {
      setLoading(true);
      const response = await instance.get(`/student?course_id=${course_id}`);
      setStudents(response.data?.students);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const clearState = () => {
    setError(null);
    setLoading(false);
    setStudents([]);
  };

  return (
    <StudentContext.Provider
      value={{
        getStudentList,
        getStudentsInCourse,
        clearState,
        students,
        error,
        loading,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
