import { Outlet, NavLink } from "react-router-dom";
import { useAuth, SignInButton, SignOutButton } from "../api/useAuth";

import "./Layout.css";

// 1) import NavLink component

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	let { user } = useAuth();

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
