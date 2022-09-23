import { useEffect, useState } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import CreateLink from "./CreateLink";

export default function App({ user, token }) {
  const [links, setLinks] = useState([]);
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [changeStateLinks, setChangeStateLinks] = useState(false);
  user = JSON.parse(user);

  const handleClose = () => setShowCreateLink(false);
  const handleShow = () => setShowCreateLink(true);

  const getLinks = async () => {
    const res = await fetch("http://localhost:3001/link", {
      method: "GET",
      headers: { token },
    });
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    getLinks();
  }, [changeStateLinks]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="my-3 text-end">Welcome {user.name}!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex align-items-center">
              <h5>Your links: </h5>
              <Button variant="outline-dark mx-2" onClick={handleShow}>
                NEW
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={5} className="mx-auto">
            <Stack gap={3}>
              {links.map((e) => (
                <div key={e.id} className="bg-light border">
                  {e.link}
                </div>
              ))}
            </Stack>
          </Col>
        </Row>
      </Container>

      {/* Modal create link */}
      <CreateLink
        show={showCreateLink}
        handleClose={handleClose}
        token={token}
        changeStateLinks={changeStateLinks}
        setChangeStateLinks={setChangeStateLinks}
      />
    </>
  );
}
