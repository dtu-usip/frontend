import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

// core styles
import "./assets/styles/styles.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { GlobalProvider } from "./contexts/globalContext";

ReactDOM.render(
  <GlobalProvider>
    <HashRouter>
      <ScrollToTop />
      <HomePage />
    </HashRouter>
  </GlobalProvider>,
  document.getElementById("root")
);
