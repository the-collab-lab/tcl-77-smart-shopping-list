import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.scss";

export function UnauthenticatedNavBar() {
	return (
		<Navbar className="custom-Nav">
			<Container className="custom-Nav__container">
				<Navbar.Brand as={NavLink} to="/" className="custom-Nav__brand">
					GrocerEase
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link
							as={NavLink}
							to="/"
							className="custom-Nav__link"
							aria-label="Home"
						>
							Home
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to="/about"
							className="custom-Nav__link"
							aria-label="About"
						>
							About
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
