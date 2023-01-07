import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// core styles
import "./assets/styles/styles.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";

import HomePage from "./pages/HomePage";
import SignIn from "./pages/Signin";
import ScrollToTop from "./components/ScrollToTop";
import { GlobalProvider } from "./contexts/globalContext";
import { UserContext } from "./contexts/userContext";

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      {user ? (
        <>
          <ScrollToTop />
          <HomePage />
        </>
      ) : (
        <SignIn />
      )}
    </BrowserRouter>
  );
}

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById("root")
);
