import { useEffect, useState } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import CreateLink from "./CreateLink";
import UpdateLink from "./UpdateLink";
import Link from "./Link";
import { getLinks } from "../helpers/links";

export default function App({ user, token }) {
  const [links, setLinks] = useState([]);
  const [changeStateLinks, setChangeStateLinks] = useState(false);
  const [linkToUpdate, setLinkToUpdate] = useState(null);
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [showUpdateLink, setShowUpdateLink] = useState(false);
  user = JSON.parse(user);

  const handleCloseCreateLink = () => setShowCreateLink(false);
  const handleShowCreateLink = () => setShowCreateLink(true);
  const handleCloseUpdateLink = () => setShowUpdateLink(false);
  const handleShowUpdateLink = (idLink) => {
    setLinkToUpdate(idLink);
    setShowUpdateLink(true);
  };

  useEffect(() => {
    getLinks(token, setLinks);
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
              <Button
                variant="outline-dark mx-2"
                onClick={handleShowCreateLink}
              >
                NEW
              </Button>
            </div>
          </Col>
        </Row>
        {/* Link component */}
        <Link
          links={links}
          token={token}
          handleShowUpdateLink={handleShowUpdateLink}
          setChangeStateLinks={setChangeStateLinks}
          changeStateLinks={changeStateLinks}
        />
      </Container>

      {/* Modal create link */}
      {showCreateLink && (
        <CreateLink
          show={showCreateLink}
          handleClose={handleCloseCreateLink}
          token={token}
          changeStateLinks={changeStateLinks}
          setChangeStateLinks={setChangeStateLinks}
        />
      )}
      {/* Modal update link */}
      {showUpdateLink && (
        <UpdateLink
          show={showUpdateLink}
          handleClose={handleCloseUpdateLink}
          token={token}
          changeStateLinks={changeStateLinks}
          setChangeStateLinks={setChangeStateLinks}
          linkToUpdate={linkToUpdate}
        />
      )}
    </>
  );
}
