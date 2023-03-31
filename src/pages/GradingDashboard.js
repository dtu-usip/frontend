import React from "react";
import BarChart from "../components/BarChart";
import GradesTable from "../components/GradesTable";
import "../styles/gradingDashboard.css";

const GradingDashboard = () => {
  return (
    <div>
      <div className="chart">
        <BarChart />
      </div>
      <h2>Grade Report</h2>
      <GradesTable />
    </div>
  );
};

export default GradingDashboard;
