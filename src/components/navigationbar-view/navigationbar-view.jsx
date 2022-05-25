import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import './navigationbar-view.scss';

export function NavbarView() {
  let user = localStorage.getItem("user");

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
      <>
    <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
		<Container>
		<Navbar.Brand href="#home">MyFlix list of movies</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
				{isAuth() && (
					<><Nav className="mx-auto">
							  <Link to="/">
								  <Nav.Link href="#api">Movies</Nav.Link>
							  </Link>
							  <Link to="/profile">
								  <Nav.Link href="#portfolio">Profile</Nav.Link>
							  </Link>
							  {/* <Link to="/favourites">
								  <Nav.Link href="#favourites">Favourites</Nav.Link>
							  </Link> */}
						  		</Nav>
								  <Nav className="mx-auto">
								  <Nav.Link href="#logout" onClick={() => onLoggedOut()}>
									  Logout
								  </Nav.Link>
								  <Nav.Link disabled>{user}</Nav.Link>
							  </Nav></>
				)}
				</Navbar.Collapse>
		</Container>
	</Navbar>
   </>
)
}