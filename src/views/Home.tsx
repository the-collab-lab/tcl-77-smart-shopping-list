import React from "react";
import { List, User } from "../api";
import { AuthenticatedHome, UnauthenticatedHome } from "../views";

interface Props {
	data: List[];
	setListPath: (path: string) => void;
	user: User | null;
}

export function Home({ data, setListPath, user }: Props) {
	return (
		<>
			{user ? (
				<AuthenticatedHome data={data} setListPath={setListPath} user={user} />
			) : (
				<UnauthenticatedHome />
			)}
		</>
	);
}
