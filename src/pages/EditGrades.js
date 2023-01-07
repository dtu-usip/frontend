import React from "react";
import CoursesTable from "../components/CoursesTable";

let EditGrade = () => {
  return (
    <center>
      <h2>Your courses</h2>
      <div className="flex-wrap flex-md-nowrap align-items-center py-4">
        <CoursesTable />
      </div>
    </center>
  );
};

export default EditGrade;
