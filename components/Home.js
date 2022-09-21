import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center p-5">App Link</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <p>In this web application you can save your favorite links.</p>
        </Col>
      </Row>
    </Container>
  );
}
