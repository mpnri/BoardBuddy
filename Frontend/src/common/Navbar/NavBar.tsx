import React, { useCallback, useState } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  Button,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";
import {
  FaRegBell,
  FaQuestionCircle,
  FaUserCircle,
  FaTrello,
  FaClipboard,
  FaClipboardList,
} from "react-icons/fa";
import styles from "./NavBar.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "~/utils/hooks.store";
import { userSelector } from "~/users/users.selector";
import { myIDSelector } from "~/auth/auth.selector";
import { AuthActions } from "~/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "~/routes/utils";
import { BottomSheet } from "react-spring-bottom-sheet";

const TrelloNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const me = useAppSelector((state) =>
    userSelector(state, myIDSelector(state))
  );
  const logoutHandler = useCallback(() => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(AuthActions.setUnAuthorized());
    setTimeout(() => {
      navigate(AppRoutes.LOGIN);
    }, 100);
  }, [dispatch, navigate]);

  const [isBoardBottomSheetOpen, setIsBoardBottomSheetOpen] = useState(false);

  return (
    <Navbar variant="dark" expand="lg" className={styles.TrelloNavbar}>
      <Navbar.Brand href="#home" className={styles.NavbarBrand}>
        <FaTrello className="me-2" />
        Trello
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Dropdown>
            <Dropdown.Toggle
              className={styles.NavDropdown}
              variant="dark"
              id="workspaces-dropdown"
            >
              Workspaces
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#action/3.1">Workspace 1</Dropdown.Item>
              <Dropdown.Item href="#action/3.2">Workspace 2</Dropdown.Item>
              <Dropdown.Item href="#action/3.3">Workspace 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={styles.NavDropdown}
              variant="dark"
              id="recent-dropdown"
            >
              Recent
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#action/4.1">Recent 1</Dropdown.Item>
              <Dropdown.Item href="#action/4.2">Recent 2</Dropdown.Item>
              <Dropdown.Item href="#action/4.3">Recent 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={styles.NavDropdown}
              variant="dark"
              id="starred-dropdown"
            >
              Starred
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#action/5.1">Starred 1</Dropdown.Item>
              <Dropdown.Item href="#action/5.2">Starred 2</Dropdown.Item>
              <Dropdown.Item href="#action/5.3">Starred 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={styles.NavDropdown}
              variant="dark"
              id="templates-dropdown"
            >
              Templates
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#action/6.1">Template 1</Dropdown.Item>
              <Dropdown.Item href="#action/6.2">Template 2</Dropdown.Item>
              <Dropdown.Item href="#action/6.3">Template 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="create-dropdown"
              className={styles.createBtn}
            >
              Create
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" className={styles.createMenu}>
              <Dropdown.Item className={styles.createMenuItem}>
                <div className={styles.menuItemIcon}>
                  <FaClipboard />
                </div>
                <div
                  className={styles.menuItemContent}
                  onClick={() => setIsBoardBottomSheetOpen(true)}
                >
                  <div
                    style={{ fontWeight: "bold" }}
                    className={styles.menuItemTitle}
                  >
                    Create board
                  </div>
                  <div className={styles.menuItemDescription}>
                    A board is made up of cards ordered on lists.
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={styles.createMenuItem}>
                <div className={styles.menuItemIcon}>
                  <FaClipboardList />
                </div>
                <div className={styles.menuItemContent}>
                  <div
                    style={{ fontWeight: "bold" }}
                    className={styles.menuItemTitle}
                  >
                    Create a Workspace
                  </div>
                  <div className={styles.menuItemDescription}>
                    Get started faster with a board template.
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
      <Form className={clsx("d-flex", styles.SearchForm)}>
        <FormControl
          type="text"
          placeholder="Search"
          className={clsx("me-2", styles.FormControl)}
        />
      </Form>
      <Nav>
        <Dropdown align="end" className={styles.regDropdown}>
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-regbell"
            className={styles.regdropdownToggle}
          >
            <FaRegBell className={styles.regIcon} />
          </Dropdown.Toggle>
        </Dropdown>
        <Dropdown align="end" className={styles.queDropdown}>
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-question"
            className={styles.quedropdownToggle}
          >
            <FaQuestionCircle className={styles.queIcon} />
          </Dropdown.Toggle>
        </Dropdown>
        <Dropdown align="end" className={styles.profileDropdown}>
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-profile"
            className={styles.dropdownToggle}
          >
            <FaUserCircle className={styles.userIcon} />
          </Dropdown.Toggle>
          <Dropdown.Menu
            className={`dropdown-menu-dark ${styles.dropdownMenu}`}
          >
            <Dropdown.Header className={styles.dropdownHeader}>
              ACCOUNT
            </Dropdown.Header>
            <Dropdown.Item href="#">
              <div className="d-flex align-items-center">
                <FaUserCircle className={styles.InneruserIcon} />
                <div className={`ms-2 ${styles.profileInfo}`}>
                  <div>{me?.username}</div>
                  <small className={styles.email}>{me?.email}</small>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item href="#">Switch accounts</Dropdown.Item>
            <Dropdown.Item href="#">Manage account</Dropdown.Item>
            <Dropdown.Divider className={styles.dropdownDivider} />
            <Dropdown.Header className={styles.dropdownHeader}>
              TRELLO
            </Dropdown.Header>
            <Dropdown.Item href="#">Profile and visibility</Dropdown.Item>
            <Dropdown.Item href="#">Activity</Dropdown.Item>
            <Dropdown.Item href="#">Cards</Dropdown.Item>
            <Dropdown.Item href="#">Settings</Dropdown.Item>
            <Dropdown.Item href="#">Theme</Dropdown.Item>
            <Dropdown.Divider className={styles.dropdownDivider} />
            <Dropdown.Item href="#">Create Workspace</Dropdown.Item>
            <Dropdown.Divider className={styles.dropdownDivider} />
            <Dropdown.Item href="#">Help</Dropdown.Item>
            <Dropdown.Item href="#">Shortcuts</Dropdown.Item>
            <Dropdown.Divider className={styles.dropdownDivider} />
            <Dropdown.Item href="#" onClick={logoutHandler}>
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
      <>
        <CreateBoardBottomSheet
          isOpen={isBoardBottomSheetOpen}
          closeHandler={() => setIsBoardBottomSheetOpen(false)}
        />
      </>
    </Navbar>
  );
};

const CreateBoardBottomSheet: React.FC<{
  isOpen: boolean;
  closeHandler(): void;
}> = ({ isOpen, closeHandler }) => {
  return (
    <BottomSheet
      open={isOpen}
      className={styles.BottomSheet}
      onDismiss={closeHandler}
      expandOnContentDrag
    >
      <Container>
        <Container style={{ height: 20 }}></Container>
        <Form style={{ color: "#9fadbc" }}>
          <Form.Label className="w-100 fs-5 text-center fw-bold">
            Create Board
          </Form.Label>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Board Title:</Form.Label>
            <Form.Control type="text" placeholder="Kanban" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="fw-bold">Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
        <Container style={{ height: 50 }}></Container>
      </Container>
    </BottomSheet>
  );
};

export default TrelloNavbar;
