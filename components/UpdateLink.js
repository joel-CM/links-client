import { useEffect, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { tempErrorAlert } from "../helpers/alerts";

export default function UpdateLink(props) {
  const link = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/link/update/${props.linkToUpdate}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: props.token },
        body: JSON.stringify({ link: link.current.value }),
      }
    );
    const data = await res.json();
    if (data.error) return tempErrorAlert(data.msg, 1000);
    props.setChangeStateLinks(!props.changeStateLinks);

    props.handleClose();
  };

  const getLinkBYId = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/link/${props.linkToUpdate}`,
      {
        method: "GET",
        headers: { token: props.token },
      }
    );
    const data = await res.json();
    if (data.error) return tempErrorAlert(data.msg, 1000);
    link.current.value = data.link;
  };

  useEffect(() => {
    getLinkBYId();
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
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
