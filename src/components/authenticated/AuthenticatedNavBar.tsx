import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../../api";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.scss";

export function AuthenticatedNavBar() {
	return (
		<Navbar className="Nav">
			<Container className="Nav-container">
				<Navbar.Brand as={NavLink} to="/">
					GrocerEase
				</Navbar.Brand>
				<Nav.Link as={NavLink} to="/" className="Nav-link" aria-label="Home">
					Home
				</Nav.Link>

				<Nav.Link
					as={NavLink}
					to="/manage-list"
					className="Nav-link"
					aria-label="Manage List"
				>
					Manage List
				</Nav.Link>
				<SignOutButton />
			</Container>
		</Navbar>
	);
}
