import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function SignUp({ show, handleClose }) {
  const [state, setState] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSend = async () => {
    const res = await fetch("http://localhost:3001/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    const data = await res.json();
    if (data.error) return alert(data.msg);
    handleClose();
    alert(data.msg);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter name"
              onChange={handleState}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupLastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="lastname"
              name="lastname"
              placeholder="Enter lastname"
              onChange={handleState}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleState}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleState}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleSend}>
          SignUp
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
