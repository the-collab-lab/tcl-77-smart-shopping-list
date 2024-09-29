import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../../api";

import "../NavBar.css";

export function AuthenticatedNavBar() {
	return (
		<nav className="Nav">
			<div className="Nav-container">
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
			</div>
		</nav>
	);
}
