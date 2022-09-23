import { useEffect, useState } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import CreateLink from "./CreateLink";
import style from "./App.module.css";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import * as alerts from "../helpers/alerts";

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
        <div className={style.linksContainer}>
          {links.map((e) => (
            <span key={e.id} className={style.link}>
              {e.link}
              <AiFillDelete
                className={style.btnDelete}
                onClick={() => deleteLink(e.id)}
              />
              <BiEdit className={style.btnEdit} />
            </span>
          ))}
        </div>
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
