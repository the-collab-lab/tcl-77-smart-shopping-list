import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../api";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import "./AuthenticatedNavBar.css";

export function AuthenticatedNavBar() {
	return (
		<Navbar className="Nav">
			<Container className="Nav-container">
				<SignOutButton />
				<NavLink to="/" className="Nav-link" aria-label="Home">
					Home
				</NavLink>
				<NavLink to="/list" className="Nav-link" aria-label="List">
					List
				</NavLink>
				<NavLink
					to="/manage-list"
					className="Nav-link"
					aria-label="Manage List"
				>
					Manage List
				</NavLink>
			</Container>
		</Navbar>
	);
}
