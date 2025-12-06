import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

function NavigationBar() {
  const navStyles = {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
  };

  const brandStyles = {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    fontSize: "1.3rem",
  };

  return (
    <Navbar
      bg="success"
      variant="dark"
      expand="lg"
      sticky="top"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" style={brandStyles}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src="/tonicist-logo.png"
              alt="Brand Icon"
              style={{ width: "32px", height: "32px", objectFit: "contain" }}
            />
            <span>Tonicist Association</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/events" style={navStyles}>
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/performances" style={navStyles}>
              Performances
            </Nav.Link>
            <Nav.Link as={Link} to="/resources" style={navStyles}>
              Resources
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery" style={navStyles}>
              Gallery
            </Nav.Link>
            <Nav.Link as={Link} to="/faqs" style={navStyles}>
              FAQs
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={navStyles}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
