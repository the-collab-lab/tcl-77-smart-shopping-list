import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../../api";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.css";

export function AuthenticatedNavBar() {
	return (
		<Navbar expand="lg" fixed="bottom" className="Nav">
			<Container className="d-flex justify-content-around Nav-container">
				<SignOutButton />
				<Nav.Link as={NavLink} to="/" className="Nav-link" aria-label="Home">
					Home
				</Nav.Link>
				<Nav.Link
					as={NavLink}
					to="/list"
					className="Nav-link"
					aria-label="List"
				>
					List
				</Nav.Link>
				<Nav.Link
					as={NavLink}
					to="/manage-list"
					className="Nav-link"
					aria-label="Manage List"
				>
					Manage List
				</Nav.Link>
			</Container>
		</Navbar>
	);
}
