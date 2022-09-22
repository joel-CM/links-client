import { useRouter } from "next/router";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";

export default function Layout(props) {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const handleLogOut = () => {
    removeCookie("token");
    router.push("/");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>App Link</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogOut}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {props.children}
    </>
  );
}
