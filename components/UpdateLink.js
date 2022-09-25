import { useEffect, useState, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { tempErrorAlert } from "../helpers/alerts";
import { updateLink, getLinkBYId } from "../helpers/links";

export default function UpdateLink(props) {
  const link = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateLink(
      props.token,
      props.linkToUpdate,
      link.current.value,
      props.setChangeStateLinks,
      props.changeStateLinks,
      props.handleClose
    );
    setLoading(false);
  };

  useEffect(() => {
    getLinkBYId(props.token, link, props.linkToUpdate);
  }, []);

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupLink">
            <Form.Label>Link: </Form.Label>
            <Form.Control
              type="link"
              ref={link}
              placeholder="Update link"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {loading ? "loading..." : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
