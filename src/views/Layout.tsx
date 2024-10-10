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
		<div className="Layout">
			<header className="Layout-header">
				{user ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar />}
			</header>
			<main className="Layout-main overflow-auto">
				{user && (
					<Button
						className="custom-button m-2"
						onClick={() => navigate("/about")}
						aria-label="Navigate to the about application page."
					>
						about
					</Button>
				)}
				<Outlet />
			</main>
		</div>
	);
}
