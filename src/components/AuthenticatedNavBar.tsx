import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "../api";

import "./AuthenticatedNavBar.scss";

export function AuthenticatedNavBar() {
	return (
		<nav className="Nav">
			<div className="Nav__container">
				<SignOutButton />
				<NavLink to="/" className="Nav__link" aria-label="Home">
					Home
				</NavLink>

				<NavLink
					to="/manage-list"
					className="Nav__link"
					aria-label="Manage List"
				>
					Manage List
				</NavLink>
			</div>
		</nav>
	);
}
