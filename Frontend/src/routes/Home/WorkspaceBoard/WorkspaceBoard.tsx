import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';
import './WorkspaceBoard.scss';  

const Dashboard = () => {
  const recentlyViewed = [
    { name: 'BoardBuddy', color: '#0079bf' },
    { name: 'Test', color: '#60bd4f' },
    { name: 'AlgorithmDesign', color: '#eb5a16' },
    { name: 'MyProgram', color: '#eb5a46' }
  ];

  const workspaces = [
    { name: 'MyProgram', color: '#607D8B' },
    { name: 'MySchedule', color: '#C2185B' },
    { name: 'Test', color: '#5B6F91' },
    { name: 'Create new board', color: 'rgba(161, 189, 217, 0.08'}
  ];

  return (
    <Container fluid className="dashboard">
      <Row className="mb-4">
        <Col xs={12}>
          <h4>Recently Viewed</h4>
          <div className="d-flex flex-row flex-wrap">
            {recentlyViewed.map((board, idx) => (
              <div key={idx} className="p-2">
                <Card style={{ backgroundColor: board.color, width: '15rem' }}>
                  <Card.Body>
                    <Card.Title>{board.name}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <h4>Your Workspaces</h4>
          <div className="d-flex flex-row flex-wrap">
            {workspaces.map((board, idx) => (
              <div key={idx} className="p-2">
                <Card style={{ backgroundColor: board.color, width: '15rem' }}>
                  <Card.Body>
                    <Card.Title>{board.name}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;