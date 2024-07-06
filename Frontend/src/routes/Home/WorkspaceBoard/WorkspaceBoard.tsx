import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./WorkspaceBoard.module.scss";
import clsx from "clsx";
import { useAppSelector } from "../../../utils/hooks.store";
import { BoardsAPI } from "../../../boards/boards.api";

const colors = ["#607D8B", "#C2185B", "#5B6F91", "rgba(161, 189, 217, 0.08"];

const Dashboard = () => {
  //todo: add recently viewed
  const recentlyViewed = [
    { name: "BoardBuddy", color: "#0079bf" },
    { name: "Test", color: "#60bd4f" },
    { name: "AlgorithmDesign", color: "#eb5a16" },
    { name: "MyProgram", color: "#eb5a46" },
  ];

  const workspacesMap = useAppSelector((state) => state.workspaces.workspaces);

  return (
    <Container fluid className={styles.Dashboard}>
      <Row className="mb-4">
        <Col xs={12}>
          <h4>Recently Viewed</h4>
          <div className="d-flex flex-row flex-wrap">
            {recentlyViewed.map((board, idx) => (
              <div key={idx} className="p-2">
                <Card
                  className={styles.Card}
                  style={{ backgroundColor: board.color, width: "15rem" }}
                >
                  <Card.Body className={styles.CardBody}>
                    <Card.Title className={styles.CardTitle}>
                      {board.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <Row className="mb-4 w-100 ps-10 pe-10">
        <Col xs={12}>
          <h4>Your Workspaces</h4>
          {Array.from(workspacesMap.values()).map((workspace) => (
            <Row key={workspace.id} className={clsx("mb-4", styles.Workspace)}>
              <div className={styles.WorkspaceTitleWrapper}>
                <div className={styles.WorkspaceNameBadge}>
                  <p>{workspace.name[0]}</p>
                </div>
                <h5 className={styles.WorkspaceName}>{workspace.name}</h5>
              </div>
              <div className="d-flex flex-row flex-wrap">
                {workspace.boards.map((board, idx) => (
                  <div key={idx} className="p-2">
                    <Card
                      className={styles.Card}
                      style={{
                        backgroundColor: colors[idx % colors.length],
                        width: "15rem",
                      }}
                    >
                      <Card.Body className={styles.CardBody}>
                        <Card.Title className={styles.CardTitle}>
                          {board.name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
