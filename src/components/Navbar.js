import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Nav,
  Image,
  Navbar,
  Dropdown,
  Container,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../routes";

import Profile3 from "../assets/img/Student.png";
import { UserContext } from "../contexts/userContext";

let Props = () => {
  const { user, logout } = useContext(UserContext);

  const CustomDropdown = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      className="media d-flex align-items-center"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
      <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
      <div className="d-flex media-body ms-2 text-dark align-items-center d-lg-block">
        <span className="mb-0 font-small fw-bold">{user?.username}</span>
      </div>
      {children}
    </div>
  ));

  function dropdown_menu() {
    let dynamic_to =
      user.role === "student" ? Routes.ViewGrades.path : Routes.EditGrades.path;
    let dynamic_title = user.role === "student" ? "View Grades" : "Edit Grades";
    return (
      <>
        <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
          <Dropdown.Item className="fw-bold" as={Link} to={dynamic_to}>
            <FontAwesomeIcon icon={faUserCircle} className="me-2" />{" "}
            {dynamic_title}
          </Dropdown.Item>
          <Dropdown.Item
            className="fw-bold"
            as={Link}
            to={Routes.Settings.path}
          >
            <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item className="fw-bold" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />{" "}
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </>
    );
  }

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={CustomDropdown} className="pt-1 px-0" />

            {dropdown_menu()}
          </Dropdown>
          <div>
            <h6>
              <b>Faculty Portal</b>
            </h6>
            <h7>Delhi Technological University</h7>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Props;
