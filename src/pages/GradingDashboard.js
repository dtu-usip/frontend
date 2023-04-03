import React from "react";
import CoursesTable from "../components/CoursesTable";
import "../styles/gradingDashboard.css";

const GradingDashboard = () => {
  return (
    <center>
      <h2>Your courses</h2>
      <div className="flex-wrap flex-md-nowrap align-items-center py-4">
        <CoursesTable isGrading={true} />
      </div>
    </center>
  );
};

export default GradingDashboard;
