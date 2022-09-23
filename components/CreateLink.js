import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function App(props) {
  const link = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/link/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: props.token },
      body: JSON.stringify({ link: link.current.value }),
    });
    const data = await res.json();
    if (data.error) return alert(data.msg);
    props.setChangeStateLinks(!props.changeStateLinks);
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupLink">
            <Form.Label>Link: </Form.Label>
            <Form.Control
              type="link"
              ref={link}
              placeholder="Enter a new link"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
