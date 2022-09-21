import { useState } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import LogIn from "../components/LogIn";

export default function Layout(props) {
  const [showLogIn, setShowLogIn] = useState(false);

  const handleCloseLogIn = () => setShowLogIn(false);
  const handleShowLogIn = () => setShowLogIn(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>App Link</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link onClick={handleShowLogIn}>LogIn</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>LogOut</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LogIn show={showLogIn} handleClose={handleCloseLogIn} />

      {props.children}
    </>
  );
}
