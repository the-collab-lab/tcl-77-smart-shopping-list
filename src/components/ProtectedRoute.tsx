import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../api/firebase";

interface Props {
	user: User | null;
	redirectPath: string;
}

export function ProtectRoute({ user, redirectPath }: Props) {
	return user ? <Outlet /> : <Navigate to={redirectPath} />;
}
