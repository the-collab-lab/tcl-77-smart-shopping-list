import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "../api";
import { AuthenticatedNavBar, UnauthenticatedNavBar } from "../components";
import Button from "react-bootstrap/Button";

import "./Layout.css";

interface Props {
	user: User | null;
}

export function Layout({ user }: Props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="Layout  vh-100">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main overflow-scroll">
					{user && (
						<Button
							onClick={() => navigate("/about")}
							aria-label="Navigate to the about application page."
						>
							about
						</Button>
					)}
					<Outlet />
				</main>
				{user ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar />}
			</div>
		</>
	);
}
