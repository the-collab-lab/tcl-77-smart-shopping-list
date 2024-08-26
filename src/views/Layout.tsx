import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { SignInButton, SignOutButton } from "../api/useAuth";
import { User } from "../api/firebase";

import "./Layout.css";

interface Props {
	user: User | null;
}

export function Layout({ user }: Props) {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						{!!user ? <SignOutButton /> : <SignInButton />}
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
			</div>
		</>
	);
}
