import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { tempErrorAlert } from "../helpers/alerts";

export default function PageLogIn() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["token", "user"]);
  const [state, setState] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) return tempErrorAlert(data.msg, 1000);
    setCookie("token", data.msg.token, { path: "/", maxAge: 86400 * 7 });
    setCookie("user", data.msg.user, { path: "/", maxAge: 86400 * 7 });
    router.push("/app");
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="m-5 text-center">Log In</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Button
                type="submit"
                variant="primary d-block w-100"
                className="d-block w-100"
              >
                {loading ? "loading..." : "LogIn"}
              </Button>
            </Form.Group>
          </Form>
          <Button
            type="submit"
            variant="outline-dark d-block w-100"
            className="d-block w-100"
            onClick={() => router.push("/signup")}
          >
            SignUp
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
