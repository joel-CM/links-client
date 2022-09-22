import { useRouter } from "next/router";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Home() {
  const router = useRouter();

  return (
    <>
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
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="d-grid">
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => router.push("/login")}
            >
              Log In
            </Button>
            <Button
              variant="outline-dark"
              className="mb-4"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
