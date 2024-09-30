import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "../api";
import { AuthenticatedNavBar, UnauthenticatedNavBar } from "../components";
import Button from "react-bootstrap/Button";

import "./Layout.scss";

interface Props {
	user: User | null;
}

export function Layout({ user }: Props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="Layout vh-100">
				<header className="Layout-header">
					<h1>GrocerEase</h1>
				</header>
				<main className="Layout-main overflow-auto">
					{user && (
						<Button
							onClick={() => navigate("/about")}
							aria-label="Navigate to the about application page."
							className="m-2"
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
