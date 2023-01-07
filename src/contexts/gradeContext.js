import React, { createContext, useState } from "react";
import instance from "../axios";
export const GradeContext = createContext();

export const GradeProvider = ({ children }) => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewGrades = async (student_id) => {
    try {
      setLoading(true);
      const response = await instance.get(`/grade?id=${student_id}`);
      setGrades(response.data?.grades);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const addGrades = async (course_id, user_id, mte_score, ete_score) => {
    try {
      setLoading(true);
      await instance.post(`/grade`, {
        course_id,
        user_id,
        mte_score,
        ete_score,
      });
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const updateGrades = async (course_id, user_id, mte_score, ete_score) => {
    try {
      setLoading(true);
      await instance.put(`/grade`, {
        course_id,
        user_id,
        mte_score,
        ete_score,
      });
      viewGrades();
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const totalNumberOfGrades = async (student_id) => {
    try {
      setLoading(true);
      const response = await instance.get(`/grade?id=${student_id}`);
      setGrades(response.data?.grades);
      setLoading(false);
    } catch (e) {
      setError(e.response?.data?.err?.message ?? e.response.data ?? e);
    }
  };

  const removeGrades = async (course_id, student_id) => {
    try {
      setLoading(true);
      await instance.delete(
        `/grade?user_id=${student_id}&course_id=${course_id}`
      );
      viewGrades();
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
    <GradeContext.Provider
      value={{
        viewGrades,
        addGrades,
        updateGrades,
        removeGrades,
        totalNumberOfGrades,
        clearState,
        grades,
        error,
        loading,
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};
