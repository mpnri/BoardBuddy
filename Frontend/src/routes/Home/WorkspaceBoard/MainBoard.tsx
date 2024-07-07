import React, { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// import { Outlet } from 'react-router-dom';
import TrelloNavbar from "~/common/Navbar/NavBar";
import LeftSidebar from "../LeftSideBar/LeftSideBar";
import WorkspaceBoard from "./WorkspaceBoard";
import styles from "./MainBoard.module.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks.store";
import { authStateSelector } from "../../../auth/auth.selector";
import { AuthState } from "../../../auth/auth.utils";
import { AppRoutes, RouterContext } from "../../utils";
import { WorkspacesAPI } from "../../../workspaces/workspaces.api";
import { WorkspacesActions } from "../../../workspaces/workspaces.slice";
import { BoardsActions } from "../../../boards/boards.slice";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(authStateSelector);
  const params = useParams();
  const isBoardPage = Boolean(params.boardID);

  useEffect(() => {
    if (authState === AuthState.UnAuthorized || authState === AuthState.Error) {
      navigate(AppRoutes.LOGIN);
    }
  }, [authState, navigate]);

  useEffect(() => {
    WorkspacesAPI.loadAllWorkspace({}).then((workspaces) => {
      dispatch(WorkspacesActions.setWorkspaces(workspaces));
      dispatch(
        BoardsActions.setNewBoards(
          workspaces
            .map((w) => w.boards)
            .reduce((prev, curr) => {
              return prev.concat(curr);
            }, [])
        )
      );
    });
  }, [dispatch]);

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
                {isBoardPage ? (
                  <Outlet context={{ dispatch } satisfies RouterContext} />
                ) : (
                  <WorkspaceBoard />
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default MainLayout;
