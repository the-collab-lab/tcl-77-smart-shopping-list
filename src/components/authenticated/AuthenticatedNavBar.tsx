import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../../api";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.scss";

export function AuthenticatedNavBar() {
	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand as={NavLink} to="/">
					GrocerEase
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse>
					<Nav>
						<Nav.Link as={NavLink} to="/" aria-label="Home">
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/manage-list" aria-label="Manage List">
							Manage List
						</Nav.Link>
						<SignOutButton />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
