import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../../api";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "../NavBar.scss";

export function AuthenticatedNavBar() {
	return (
		<Navbar collapseOnSelect expand="md">
			<Container>
				<Navbar.Brand>GrocerEase</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse>
					<Nav className="flex-grow-1 justify-content-evenly align-items-center">
						<Nav.Link as={NavLink} to="/" aria-label="Home" eventKey={"1"}>
							Home
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to="/manage-list"
							aria-label="Manage List"
							eventKey={"2"}
						>
							Manage List
						</Nav.Link>
						<SignOutButton />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
