import { Container, Row, Col } from "react-bootstrap";

export default function App({ user }) {
  user = JSON.parse(user);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">
            Welcome {user.name} {user.lastname}
          </h1>
        </Col>
      </Row>
    </Container>
  );
}
