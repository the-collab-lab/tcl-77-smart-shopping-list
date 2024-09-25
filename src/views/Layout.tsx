import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "../api";
import { AuthenticatedNavBar } from "../components";

import "./Layout.css";

interface Props {
	user: User | null;
}

export function Layout({ user }: Props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					{user && (
						<button
							onClick={() => navigate("/about")}
							aria-label="Navigate to the about application page."
						>
							about
						</button>
					)}
					<Outlet />
				</main>
				{user && <AuthenticatedNavBar />}
			</div>
		</>
	);
}
