import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createLink } from "../helpers/links";

export default function CreateLink(props) {
  const link = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createLink(
      props.token,
      link.current.value,
      props.setChangeStateLinks,
      props.cangeStateLinks,
      props.handleClose
    );
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
              autoFocus
              placeholder="Enter a new link"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
