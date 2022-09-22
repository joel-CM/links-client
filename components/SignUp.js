import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";

export default function PageSignUp() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["name"]);
  const [state, setState] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    const data = await res.json();
    if (data.error) return alert(data.msg);
    setCookie("name", "loged", { path: "/" });
    router.push("/login");
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="m-5 text-center">Sign Up</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="lastname"
                name="lastname"
                placeholder="Enter lastname"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
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
              <Button type="submit" variant="primary" className="d-clock w-100">
                SignUp
              </Button>
            </Form.Group>
          </Form>
          <Button
            variant="outline-dark"
            className="d-block w-100"
            onClick={() => router.push("/login")}
          >
            LogIn
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
