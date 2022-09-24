import { useEffect, useState } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import CreateLink from "./CreateLink";
import UpdateLink from "./UpdateLink";
import style from "./App.module.css";
import { AiFillDelete, AiOutlineCopy } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import copy from "copy-to-clipboard";
import * as alerts from "../helpers/alerts";

export default function App({ user, token }) {
  const [links, setLinks] = useState([]);
  const [linkToUpdate, setLinkToUpdate] = useState(null);
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [showUpdateLink, setShowUpdateLink] = useState(false);
  const [changeStateLinks, setChangeStateLinks] = useState(false);
  user = JSON.parse(user);

  const handleCloseCreateLink = () => setShowCreateLink(false);
  const handleShowCreateLink = () => setShowCreateLink(true);
  const handleCloseUpdateLink = () => setShowUpdateLink(false);
  const handleShowUpdateLink = (idLink) => {
    setLinkToUpdate(idLink);
    setShowUpdateLink(true);
  };

  const getLinks = async () => {
    const res = await fetch("http://localhost:3001/link", {
      method: "GET",
      headers: { token },
    });
    const data = await res.json();
    setLinks(data);
  };

  const deleteLink = async (id) => {
    const { isConfirmed } = await alerts.alertDeleteLink();
    if (!isConfirmed) return;

    const res = await fetch(`http://localhost:3001/link/delete/${id}`, {
      method: "DELETE",
      headers: { token },
    });
    const data = await res.json();
    if (data.error) return alerts.alertError(data.msg);
    setChangeStateLinks(!changeStateLinks);
    alerts.tempSuccessAlert(data.msg, 1000);
  };

  const handleCopyUrl = (url) => {
    const copied = copy(url);
    if (copied) {
      alerts.tempSuccessAlert(`${url} copied!`, 1000);
    } else {
      alerts.tempErrorAlert("Failed to copy", 1000);
    }
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
              <Button
                variant="outline-dark mx-2"
                onClick={handleShowCreateLink}
              >
                NEW
              </Button>
            </div>
          </Col>
        </Row>
        <div className={style.linksContainer}>
          {links.map((e) => (
            <span key={e.id} className={style.link}>
              {e.link}
              <AiFillDelete
                className={style.btnDelete}
                title="Delete URL"
                onClick={() => deleteLink(e.id)}
              />
              <BiEdit
                className={style.btnEdit}
                title="Edit URL"
                onClick={() => handleShowUpdateLink(e.id)}
              />
              <AiOutlineCopy
                title="Copy URL"
                className={style.btnCopy}
                onClick={() => handleCopyUrl(e.link)}
              />
            </span>
          ))}
        </div>
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
