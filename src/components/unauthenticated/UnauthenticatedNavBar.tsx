import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.scss";

export function UnauthenticatedNavBar() {
	return (
		<Navbar collapseOnSelect expand="md">
			<Container>
				<Navbar.Brand>GrocerEase</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="flex-grow-1 justify-content-evenly align-items-center">
						<Nav.Link as={NavLink} to="/" aria-label="Home" eventKey={"1"}>
							Home
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to="/about"
							aria-label="About"
							eventKey={"2"}
						>
							About
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
