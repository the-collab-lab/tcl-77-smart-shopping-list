import { Outlet, NavLink } from 'react-router-dom';
import { useAuth, SignInButton, SignOutButton } from '../api/useAuth';

import './Layout.css';

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
						<NavLink
							to="/"
							className={({ isActive, isPending, isTransitioning }) =>
								`Nav-link ${isPending ? 'pending' : ''} ${isActive ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/list"
							className={({ isActive, isPending, isTransitioning }) =>
								`Nav-link ${isPending ? 'pending' : ''} ${isActive ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`
							}
						>
							List
						</NavLink>
						<NavLink
							to="/manage-list"
							className={({ isActive, isPending, isTransitioning }) =>
								`Nav-link ${isPending ? 'pending' : ''} ${isActive ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`
							}
						>
							Manage List
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
