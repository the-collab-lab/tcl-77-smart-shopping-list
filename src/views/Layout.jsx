import { Outlet } from 'react-router-dom';
import { useAuth, SignInButton, SignOutButton } from '../api/useAuth';

import './Layout.css';

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
					{!!user ? <SignOutButton /> : <SignInButton />}
					<div className="Nav-container">
						<button href="#" className="Nav-link">
							Home
						</button>
						<button href="#" className="Nav-link">
							List
						</button>
						<button href="#" className="Nav-link">
							Manage List
						</button>
					</div>
				</nav>
			</div>
		</>
	);
}
