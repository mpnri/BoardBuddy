import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Outlet } from 'react-router-dom';
import TrelloNavbar from '../NavBar/NavBar';
import LeftSidebar from '../LeftSideBar/LeftSideBar';
import WorkspaceBoard from './WorkspaceBoard'; 
import './MainBoard.scss';

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <TrelloNavbar />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="px-0">
            <LeftSidebar />
          </Col>
          <Col md={9} lg={10} className="main-content">
            <WorkspaceBoard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainLayout;