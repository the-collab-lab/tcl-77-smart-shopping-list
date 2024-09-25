import React from "react";
import { NavLink } from "react-router-dom";

import "../NavBar.css";

export function UnauthenticatedNavBar() {
	return (
		<nav className="Nav">
			<div className="Nav-container">
				<NavLink to="/" className="Nav-link" aria-label="Home">
					Home
				</NavLink>
				<NavLink to="/about" className="Nav-link" aria-label="About">
					About
				</NavLink>
			</div>
		</nav>
	);
}
