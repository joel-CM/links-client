import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SignUp from "../components/SignUp";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

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
            <Button variant="outline-dark" size="sm" onClick={handleShowSignUp}>
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Sign Up component */}
      <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
    </>
  );
}
