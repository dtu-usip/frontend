import React, { createContext } from "react";
import { GradeProvider } from "./gradeContext";
import { StudentProvider } from "./studentContext";
import { TeacherProvider } from "./teacherContext";
import { UserProvider } from "./userContext";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={{}}>
      <UserProvider>
        <StudentProvider>
          <TeacherProvider>
            <GradeProvider>{children}</GradeProvider>
          </TeacherProvider>
        </StudentProvider>
      </UserProvider>
    </GlobalContext.Provider>
  );
};
