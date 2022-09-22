import { Container, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";

export default function App() {
  const [cookies] = useCookies();

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">
            Welcome {cookies.user.name} {cookies.user.lastname}!
          </h1>
        </Col>
      </Row>
    </Container>
  );
}
