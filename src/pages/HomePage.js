import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import GradingDashboard from "./GradingDashboard";
import GradingDashboardCourse from "./GradingDashboardCourse";
import Overview from "./Overview";
import Settings from "./Settings";

import ViewGrades from "./ViewGrades";
import EditGrades from "./EditGrades";
import Signin from "./Signin";
import NotFoundPage from "./NotFound";
import ServerError from "./ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import StudentsTable from "../components/StudentsTable";
import GradingSidebar from "../components/GradingSidebar";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, CustomSidebar, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          {CustomSidebar ? <CustomSidebar /> : <Sidebar />}
          <main className="content">
            <Navbar />
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};

let Props = () => (
  <Switch>
    <RouteWithSidebar
      exact
      path={Routes.GradingDashboard.path}
      component={GradingDashboard}
      CustomSidebar={GradingSidebar}
    />
    <RouteWithSidebar
      path={`/grading-dashboard/:id`}
      component={GradingDashboardCourse}
      CustomSidebar={GradingSidebar}
    />
    <RouteWithSidebar exact path={Routes.Overview.path} component={Overview} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithSidebar path={`/edit-grades/:id`} component={StudentsTable} />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    {/* <RouteWithSidebar exact path={Routes.About.path} component={About} /> */}
    <RouteWithSidebar
      exact
      path={Routes.ViewGrades.path}
      component={ViewGrades}
    />
    <RouteWithSidebar
      exact
      path={Routes.EditGrades.path}
      component={EditGrades}
    />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);

export default Props;
