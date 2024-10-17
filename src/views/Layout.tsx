import React from "react";
import { Outlet } from "react-router-dom";
import { User } from "../api";
import { AuthenticatedNavBar, UnauthenticatedNavBar } from "../components";

import "./Layout.scss";

interface Props {
	user: User | null;
}

export function Layout({ user }: Props) {
	return (
		<div className="Layout">
			<header className="Layout-header">
				{user ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar />}
			</header>
			<main className="Layout-main overflow-auto">
				<Outlet />
			</main>
		</div>
	);
}
