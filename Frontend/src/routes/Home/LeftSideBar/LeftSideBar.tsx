import React from "react";
import { Nav, Accordion } from "react-bootstrap";
import {
  BsKanban,
  BsGrid1X2,
  BsHouse,
  BsHeartFill,
  BsGrid3X3Gap,
  BsPeople,
  BsGear,
} from "react-icons/bs";
import styles from "./LeftSideBar.module.scss";
import clsx from "clsx";

const LeftSidebar: React.FC = () => {
  return (
    <Nav
      className={clsx("flex-column", styles.LeftSidebar)}
      aria-label="Sidebar Navigation"
    >
      <Nav.Link className={styles.NavLink} href="#boards">
        <BsKanban aria-hidden="true" /> Boards
      </Nav.Link>
      <Nav.Link className={styles.NavLink} href="#templates">
        <BsGrid1X2 aria-hidden="true" /> Templates
      </Nav.Link>
      <Nav.Link className={styles.NavLink} href="#home">
        <BsHouse aria-hidden="true" /> Home
      </Nav.Link>
      <hr />
      <h6>Workspaces</h6>
      <Accordion defaultActiveKey="0">
        <Accordion.Item
          eventKey="0"
          className={styles.AccordionItemTransparent}
        >
          <Accordion.Header className={styles.AccordionHeader}>
            <span className={styles.WorkspaceIcon}>T</span>
            Trello Workspace
          </Accordion.Header>
          <Accordion.Body className={styles.AccordionBody}>
            <Nav
              className={clsx("flex-column", styles.WorkspaceSubNav)}
              aria-label="Workspace Sub-navigation"
            >
              <Nav.Link className={styles.NavLink} href="#boards">
                <BsKanban aria-hidden="true" /> Boards
              </Nav.Link>
              <Nav.Link className={styles.NavLink} href="#highlights">
                <BsHeartFill aria-hidden="true" /> Highlights
              </Nav.Link>
              <Nav.Link className={styles.NavLink} href="#views">
                <BsGrid3X3Gap aria-hidden="true" /> Views
              </Nav.Link>
              <Nav.Link className={styles.NavLink} href="#members">
                <BsPeople aria-hidden="true" /> Members{" "}
                <span className="float-end">+</span>
              </Nav.Link>
              <Nav.Link className={styles.NavLink} href="#settings">
                <BsGear aria-hidden="true" /> Settings
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Nav>
  );
};

export default LeftSidebar;
