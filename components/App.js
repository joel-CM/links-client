import { useEffect, useState } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";

export default function App({ user, token }) {
  const [state, setState] = useState([]);
  user = JSON.parse(user);

  const getLinks = async () => {
    const res = await fetch("http://localhost:3001/link", {
      method: "GET",
      headers: { token },
    });
    const data = await res.json();
    setState(data);
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">
            Welcome {user.name} {user.lastname}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={5} className="mx-auto">
          <Stack gap={3}>
            {state.map((e) => (
              <div className="bg-light border">{e.link}</div>
            ))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
