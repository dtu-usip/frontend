import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../components/BarChart";
import GradesTable from "../components/GradesTable";
import { GradeDashboardContext } from "../contexts/gradingDashboardContext";
import "../styles/gradingDashboard.css";

const GradingDashboardCourse = () => {
  const { id } = useParams();
  const { getGradeDashboard, clearState } = useContext(GradeDashboardContext);

  useEffect(() => {
    if (id) {
      getGradeDashboard(id);
    }

    return () => {
      clearState();
    };
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

export default GradingDashboardCourse;
