import React from 'react';
import { Nav, Accordion } from 'react-bootstrap';
import { BsKanban, BsGrid1X2, BsHouse, BsHeartFill, BsGrid3X3Gap, BsPeople, BsGear, BsChevronDown } from 'react-icons/bs';
import './LeftSideBar.scss';

const LeftSidebar: React.FC = () => {
  return (
    <Nav className="flex-column left-sidebar" aria-label="Sidebar Navigation">
      <Nav.Link href="#boards"><BsKanban aria-hidden="true" /> Boards</Nav.Link>
      <Nav.Link href="#templates"><BsGrid1X2 aria-hidden="true" /> Templates</Nav.Link>
      <Nav.Link href="#home"><BsHouse aria-hidden="true" /> Home</Nav.Link>
      <hr />
      <h6>Workspaces</h6>
      <Accordion defaultActiveKey="0" className="workspace-accordion">
        <Accordion.Item eventKey="0" className='accordion-item-transparent'>
          <Accordion.Header>
            <span className="workspace-icon">T</span>
            Trello Workspace
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column workspace-subnav" aria-label="Workspace Sub-navigation">
              <Nav.Link href="#boards"><BsKanban aria-hidden="true" /> Boards</Nav.Link>
              <Nav.Link href="#highlights"><BsHeartFill aria-hidden="true" /> Highlights</Nav.Link>
              <Nav.Link href="#views"><BsGrid3X3Gap aria-hidden="true" /> Views</Nav.Link>
              <Nav.Link href="#members"><BsPeople aria-hidden="true" /> Members <span className="float-end">+</span></Nav.Link>
              <Nav.Link href="#settings"><BsGear aria-hidden="true" /> Settings</Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Nav>
  );
};

export default LeftSidebar;