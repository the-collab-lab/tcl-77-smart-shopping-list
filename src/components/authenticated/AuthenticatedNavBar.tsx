import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../../api";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.scss";

export function AuthenticatedNavBar() {
	return (
		<Navbar
			collapseOnSelect
			expand="md"
			className="bg-secondary rounded-bottom-3 pt-0"
		>
			<Container className="align-items-center justify-content-evenly">
				<Navbar.Brand className="bg-primary rounded-bottom-3 text-center mb-3 px-3 text-dark fw-bolder shadow">
					GrocerEase
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse>
					<Nav className="flex-grow-1 justify-content-evenly align-items-center fw-bolder p-1 text-center">
						<Nav.Link as={NavLink} to="/" aria-label="Home" eventKey={"1"}>
							Home
						</Nav.Link>

						<Nav.Link
							as={NavLink}
							to="/about"
							aria-label="About"
							eventKey={"3"}
						>
							About
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<SignOutButton />
			</Container>
		</Navbar>
	);
}
