import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.scss";

export function UnauthenticatedNavBar() {
	return (
		<Navbar className="Nav">
			<Container className="Nav__container">
				<Navbar.Brand as={NavLink} to="/">
					GrocerEase
				</Navbar.Brand>
				<Nav.Link as={NavLink} to="/" className="Nav__link" aria-label="Home">
					Home
				</Nav.Link>
				<Nav.Link
					as={NavLink}
					to="/about"
					className="Nav__link"
					aria-label="About"
				>
					About
				</Nav.Link>
			</Container>
		</Navbar>
	);
}
