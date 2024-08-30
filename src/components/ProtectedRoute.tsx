import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { User } from "../api";

interface Props {
	user: User | null;
	redirectPath: string;
}

type ProtectedRouteProps = { user: User };

export function ProtectRoute({ user, redirectPath }: Props) {
	return user ? (
		<Outlet context={{ user } satisfies ProtectedRouteProps} />
	) : (
		<Navigate to={redirectPath} />
	);
}

/** 
Gets the `user` object from the context of the `Outlet` component it is called in.

The function has to be called within a nested component of a route protected by `ProtectRote`. 
It will allow user-specific information without the needs to pass `user` explicity through props.

@returns {User}
*/
export function getUser() {
	return useOutletContext<ProtectedRouteProps>();
}
