import React, { createContext, useState } from "react";
import instance from "../axios";
export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState(null);
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
      const response = await instance.get(
        `/student/course?courseId=${course_id}`
      );
      setStudents(response.data?.students);
      setCourse(response.data?.course);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const clearState = () => {
    setError(null);
    setLoading(false);
    setStudents([]);
    setCourse(null);
  };

  return (
    <StudentContext.Provider
      value={{
        getStudentList,
        getStudentsInCourse,
        clearState,
        students,
        course,
        error,
        loading,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
