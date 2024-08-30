import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { SignInButton, SignOutButton, User } from "../api";

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
					{!user && <SignInButton />}
				</main>
				{user && (
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
				)}
			</div>
		</>
	);
}
