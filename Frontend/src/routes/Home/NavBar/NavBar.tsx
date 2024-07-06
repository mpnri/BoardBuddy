import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import {
  FaRegBell,
  FaQuestionCircle,
  FaUserCircle,
  FaTrello,
} from "react-icons/fa";
import styles from "./NavBar.module.scss";
import clsx from "clsx";

const TrelloNavbar = () => {
  return (
    <Navbar variant="dark" expand="lg" className={styles.TrelloNavbar}>
      <Navbar.Brand href="#home" className={styles.NavbarBrand}>
        <FaTrello className="me-2" />
        Trello
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown
            className={styles.NavDropdown}
            title="Workspaces"
            id="workspaces-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">Workspace 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Workspace 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Workspace 3</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className={styles.NavDropdown}
            title="Recent"
            id="recent-dropdown"
          >
            <NavDropdown.Item href="#action/4.1">Recent 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/4.2">Recent 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/4.3">Recent 3</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className={styles.NavDropdown}
            title="Starred"
            id="starred-dropdown"
          >
            <NavDropdown.Item href="#action/5.1">Starred 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/5.2">Starred 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/5.3">Starred 3</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className={styles.NavDropdown}
            title="Templates"
            id="templates-dropdown"
          >
            <NavDropdown.Item href="#action/6.1">Template 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/6.2">Template 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/6.3">Template 3</NavDropdown.Item>
          </NavDropdown>
          <Button variant="primary" className={styles.CreateBtn}>
            Create
          </Button>
        </Nav>
        <Form className={clsx("d-flex", styles.SearchForm)}>
          <FormControl
            type="text"
            placeholder="Search"
            className={clsx("me-2", styles.FormControl)}
          />
        </Form>
        <Nav>
          <Nav.Link className={styles.NavLink} href="#notifications">
            <FaRegBell />
          </Nav.Link>
          <Nav.Link className={styles.NavLink} href="#help">
            <FaQuestionCircle />
          </Nav.Link>
          <Nav.Link className={styles.NavLink} href="#profile">
            <FaUserCircle />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default TrelloNavbar;
