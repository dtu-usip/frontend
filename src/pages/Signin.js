import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Button, Container } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";
import { UserContext } from "../contexts/userContext";

function App() {
  const [state, setState] = useState({ username: "", password: "" });
  const { login, error, loading } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(state.username, state.password);
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (error) {
      alert("There was an error: " + error);
    }
  }, [error]);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="App">
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.GradingDashboard.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              homepage
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Login with a DTU Account</h3>
                </div>
                <center>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <br />
                    <input
                      name="username"
                      type="text"
                      placeholder="User Name"
                      onChange={handleChange}
                      className="userInput mb-4 w-50 text-center"
                    />
                    <br />
                    <FontAwesomeIcon icon={faUnlockAlt} />
                    <br />
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className="userInput mb-4 w-50 text-center"
                    />
                    <br />
                    <Button
                      variant="primary"
                      type="submit"
                      className="userSubmit w-50"
                    >
                      Log-In
                    </Button>
                  </form>
                </center>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
export default App;
