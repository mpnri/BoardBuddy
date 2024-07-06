import React, { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// import { Outlet } from 'react-router-dom';
import TrelloNavbar from "../NavBar/NavBar";
import LeftSidebar from "../LeftSideBar/LeftSideBar";
import WorkspaceBoard from "./WorkspaceBoard";
import styles from "./MainBoard.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../utils/hooks.store";
import { authStateSelector } from "../../../auth/auth.selector";
import { AuthState } from "../../../auth/auth.utils";
import { AppRoutes } from "../../utils";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const authState = useAppSelector(authStateSelector);

  useEffect(() => {
    if (authState === AuthState.UnAuthorized || authState === AuthState.Error) {
      navigate(AppRoutes.LOGIN);
    }
  }, [authState, navigate]);

  return (
    <div className={styles.MainLayout}>
      {authState === AuthState.TokenChecking ? (
        <Spinner />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default MainLayout;
