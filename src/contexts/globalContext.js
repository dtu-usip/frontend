import React, { createContext } from "react";
import { GradeProvider } from "./gradeContext";
import { StudentProvider } from "./studentContext";
import { UserProvider } from "./userContext";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider>
      <UserProvider>
        <StudentProvider>
          <GradeProvider>{children}</GradeProvider>
        </StudentProvider>
      </UserProvider>
    </GlobalContext.Provider>
  );
};
