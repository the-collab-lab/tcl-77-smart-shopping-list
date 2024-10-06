import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.scss";

export function UnauthenticatedNavBar() {
	return (
		<Navbar expand="lg" fixed="bottom" className="Nav">
			<Container className="d-flex justify-content-around Nav-container">
				<Nav.Link as={NavLink} to="/" className="Nav-link" aria-label="Home">
					Home
				</Nav.Link>
				<Nav.Link
					as={NavLink}
					to="/about"
					className="Nav-link"
					aria-label="About"
				>
					About
				</Nav.Link>
			</Container>
		</Navbar>
	);
}
