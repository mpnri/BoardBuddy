import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import { FaRegBell, FaQuestionCircle, FaUserCircle, FaTrello } from 'react-icons/fa';
import './NavBar.scss';
const TrelloNavbar = () => {
  return (
    <Navbar variant="dark" expand="lg" className="trello-navbar">
      <Navbar.Brand href="#home">
        <FaTrello className="me-2" />
        Trello
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown className='navDropdown' title="Workspaces" id="workspaces-dropdown">
            <NavDropdown.Item href="#action/3.1">Workspace 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Workspace 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Workspace 3</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown className='navDropdown' title="Recent" id="recent-dropdown">
            <NavDropdown.Item href="#action/4.1">Recent 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/4.2">Recent 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/4.3">Recent 3</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown className='navDropdown' title="Starred" id="starred-dropdown">
            <NavDropdown.Item href="#action/5.1">Starred 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/5.2">Starred 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/5.3">Starred 3</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown className='navDropdown' title="Templates" id="templates-dropdown">
            <NavDropdown.Item href="#action/6.1">Template 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/6.2">Template 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/6.3">Template 3</NavDropdown.Item>
          </NavDropdown>
          <Button variant="primary" className="create-btn">Create</Button>
        </Nav>
        <Form className="d-flex search-form">
          <FormControl type="text" placeholder="Search" className="me-2" />
        </Form>
        <Nav className='prof_notif'>
          <Nav.Link href="#notifications"><FaRegBell /></Nav.Link>
          <Nav.Link href="#help"><FaQuestionCircle /></Nav.Link>
          <Nav.Link href="#profile"><FaUserCircle /></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default TrelloNavbar;