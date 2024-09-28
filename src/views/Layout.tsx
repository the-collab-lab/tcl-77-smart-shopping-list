import React from "react";
import { Outlet } from "react-router-dom";
import { SignInButton, User } from "../api";
import { AuthenticatedNavBar } from "../components";

import "./Layout.scss";

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
				<main className="Layout-main vh-100">
					<Outlet />
					{!user && <SignInButton />}
				</main>
				{user && <AuthenticatedNavBar />}
			</div>
		</>
	);
}
